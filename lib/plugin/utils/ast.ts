// Reference: https://github.com/nestjs/swagger/blob/master/lib/plugin/utils/ast-utils.ts

import ts from 'typescript'
import {
  Decorator,
  CallExpression,
  SyntaxKind,
  Identifier,
  LeftHandSideExpression,
  PropertyAccessExpression,
} from 'typescript'

export function isDynamicallyAdded(identifier: ts.Node) {
  return identifier && !identifier.parent && identifier.pos === -1
}

export function getDecoratorArguments(decorator: Decorator) {
  const callExpression = decorator.expression
  return (callExpression && (callExpression as CallExpression).arguments) || []
}

export function getDecoratorName(decorator: Decorator) {
  const isDecoratorFactory = decorator.expression.kind === SyntaxKind.CallExpression
  if (isDecoratorFactory) {
    const callExpression = decorator.expression
    const identifier = (callExpression as CallExpression).expression as Identifier
    if (isDynamicallyAdded(identifier)) {
      return undefined
    }
    return getIdentifierFromName((callExpression as CallExpression).expression).getText()
  }
  return getIdentifierFromName(decorator.expression).getText()
}

function getIdentifierFromName(expression: LeftHandSideExpression) {
  const identifier = getNameFromExpression(expression)
  if (expression && expression.kind !== SyntaxKind.Identifier) {
    throw new Error()
  }
  return identifier
}

function getNameFromExpression(expression: LeftHandSideExpression) {
  if (expression && expression.kind === SyntaxKind.PropertyAccessExpression) {
    return (expression as PropertyAccessExpression).name
  }
  return expression
}
