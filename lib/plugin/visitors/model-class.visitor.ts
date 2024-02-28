import * as ts from 'typescript'

export class ModelClassVisitor {
  visit(sourceFile: ts.SourceFile, ctx: ts.TransformationContext, program?: ts.Program) {
    if (!program) return

    // const typeChecker = program.getTypeChecker()
    // sourceFile = this.updateImports(sourceFile, ctx.factory, program)

    const visitClassProperty = (node: ts.Node): ts.Node => {
      if (ts.isPropertyDeclaration(node)) {
      }
      return node
    }

    const visitClassNode = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        return ts.visitEachChild(node, visitClassProperty, ctx)
      }
      return ts.visitEachChild(node, visitClassNode, ctx)
    }
    return ts.visitNode(sourceFile, visitClassNode)
  }
}
