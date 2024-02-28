import ts from 'typescript'
import snakeCase from 'lodash.snakecase'

import { getDecoratorByName } from '../utils/decorators'
import {
  API_HIDE_PROPERTY_DECORATOR_NAME,
  API_PROPERTY_DECORATOR_NAME,
  CLASS_TRANSFORMER_PACKAGE_NAME,
  EXPOSE_DECORATOR_NAME,
  NESTJS_SWAGGER_PACKAGE_NAME,
} from '../constants'

export class ModelClassVisitor {
  visit(sourceFile: ts.SourceFile, ctx: ts.TransformationContext, program?: ts.Program) {
    if (!program) return sourceFile

    let updatedSourceFile = sourceFile
    updatedSourceFile = this.addImport(
      updatedSourceFile,
      CLASS_TRANSFORMER_PACKAGE_NAME,
      EXPOSE_DECORATOR_NAME,
    )
    updatedSourceFile = this.addImport(
      updatedSourceFile,
      NESTJS_SWAGGER_PACKAGE_NAME,
      API_PROPERTY_DECORATOR_NAME,
    )

    const visitClassProperty = (node: ts.Node): ts.Node => {
      if (ts.isPropertyDeclaration(node)) {
        let propertyDeclaration: ts.PropertyDeclaration = node

        let fieldName: string | undefined
        ts.forEachChild(propertyDeclaration, (childNode): void => {
          if (ts.isPropertyName(childNode)) {
            fieldName = childNode.getText()
          }
        })

        if (fieldName) {
          const snakeCaseFieldName = snakeCase(fieldName)

          // Append Expose to decorators
          propertyDeclaration = this.appendDecoratorToPropertyDeclaration(
            propertyDeclaration,
            EXPOSE_DECORATOR_NAME,
            fieldName,
            snakeCaseFieldName,
          )
          const decorators = ts.getDecorators(propertyDeclaration)
          const apiHidePropertyDecorator = getDecoratorByName(
            decorators,
            API_HIDE_PROPERTY_DECORATOR_NAME,
          )
          if (!apiHidePropertyDecorator) {
            // If no hide property decorator, append ApiProperty to decorators
            propertyDeclaration = this.appendDecoratorToPropertyDeclaration(
              propertyDeclaration,
              API_PROPERTY_DECORATOR_NAME,
              fieldName,
              snakeCaseFieldName,
            )
          }
        }

        return propertyDeclaration
      }
      return node
    }

    const visitClassNode = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        return ts.visitEachChild(node, visitClassProperty, ctx)
      }
      return ts.visitEachChild(node, visitClassNode, ctx)
    }
    return ts.visitNode(updatedSourceFile, visitClassNode)
  }

  /**
   * Add `import { namedExport } from 'packageName'` to source file
   * @param sourceFile SourceFile
   * @param packageName Package name, like 'class-transformer'
   * @param namedExport Named export, like 'Expose'
   * @returns Updated sourceFile
   */
  addImport(sourceFile: ts.SourceFile, packageName: string, namedExport: string): ts.SourceFile {
    const importDeclaration = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier(namedExport),
          ),
        ]),
      ),
      ts.factory.createStringLiteral(packageName),
      undefined,
    )

    return ts.factory.updateSourceFile(sourceFile, [importDeclaration, ...sourceFile.statements])
  }

  /**
   * Append a decorator to a property
   *
   * // Before:
   * class CatDTO {
   *   @OtherDecorator()
   *   catName: string
   * }
   *
   * // After:
   * class CatDTO {
   *   @OtherDecorator()
   *   @Expose({ name: "cat_name" })
   *   catName: string
   * }
   *
   * @param node Node to add decorator
   * @param decoratorName Decorator name, like 'Expose'
   * @param fieldName Field name before case conversion, like 'catName'
   * @param convertedName Field name after case conversion, like 'cat_name'
   * @returns Updated node
   */
  appendDecoratorToPropertyDeclaration(
    node: ts.PropertyDeclaration,
    decoratorName: string,
    fieldName: string,
    convertedName: string,
  ): ts.PropertyDeclaration {
    const existingDecorators = ts.getDecorators(node) ?? []
    const modifiers = ts.getModifiers(node) ?? []

    const updatedDecorators = [
      ...existingDecorators,
      ts.factory.createDecorator(
        ts.factory.createCallExpression(ts.factory.createIdentifier(decoratorName), undefined, [
          ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment(
              'name',
              ts.factory.createStringLiteral(convertedName),
            ),
          ]),
        ]),
      ),
    ]

    return ts.factory.updatePropertyDeclaration(
      node,
      [...updatedDecorators, ...modifiers],
      fieldName,
      node.questionToken,
      node.type,
      node.initializer,
    )
  }
}
