import snakeCase from 'lodash.snakecase'

export const caseConverter = (originalValue: unknown): unknown => {
  if (typeof originalValue !== 'object' || originalValue === null) return originalValue

  if (Array.isArray(originalValue)) return originalValue.map((subValue) => caseConverter(subValue))

  const result: Record<string, unknown> = {}

  for (const key in originalValue) {
    result[snakeCase(key)] = caseConverter((originalValue as any)[key])
  }

  return result
}
