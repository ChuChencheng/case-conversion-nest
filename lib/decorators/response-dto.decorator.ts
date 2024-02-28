import { Reflector } from '@nestjs/core'

export const CaseConversionResponse = Reflector.createDecorator<{ new (): unknown }>()
