import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

export async function getApp() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return app
}
