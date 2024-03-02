import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller'
import { CaseConversionInterceptor } from '../../../lib'

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CaseConversionInterceptor,
    },
  ],
})
export class AppModule {}
