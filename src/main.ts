import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { profile } from 'console'
import { GoogleStrategy } from './auth/google.strategy'
import { PrismaService } from './prisma/prisma.service'
declare const module: any
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  const config = new DocumentBuilder()
    .setTitle('Ecommerce website ')
    .setDescription('API for selling clothes online')
    .setVersion('1.0')
    .addTag('e-commerce')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addBasicAuth()
    .addOAuth2({
      name: 'GoogleStrategy',
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'http://localhost:3000/auth/google/callback',

          scopes: {
            'https://www.googleapis.com/auth/userinfo.profile':
              'All user operations requiring authentication.',
          },
        },
      },
    })
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(3000)
}
bootstrap()
