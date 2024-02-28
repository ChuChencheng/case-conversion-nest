import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'
import { plainToInstance } from 'class-transformer'

import { CaseConversionResponse } from '../decorators/response-dto.decorator'

@Injectable()
export class CaseConversionInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const routeHandler = context.getHandler()

    const responseDTOClass = this.reflector.get(CaseConversionResponse, routeHandler)

    return next.handle().pipe(
      map((value) => {
        const transformedValue = plainToInstance(responseDTOClass, value)
        return transformedValue
      }),
    )
  }
}
