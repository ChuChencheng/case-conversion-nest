import ts from 'typescript'

import { getDecoratorName } from './ast'

export const getDecoratorByName = (
  decorators: readonly ts.Decorator[] | undefined,
  name: string,
): ts.Decorator | undefined => {
  if (!decorators) return
  return decorators.find((decorator) => {
    try {
      const decoratorName = getDecoratorName(decorator)
      return decoratorName === name
    } catch {
      return false
    }
  })
}
