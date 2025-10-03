import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const appEnv = configService.get<string>('APP_ENV');

  if (appEnv === 'development') {
    app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });

    const config = new DocumentBuilder()
      .setTitle('Solar Monitoring API')
      .setDescription('API documentation for the Solar Monitoring project')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  const appPort = configService.get<number>('PORT') || 3000;
  await app.listen(appPort);
  Logger.log(`Application is running on: http://localhost:${appPort}`);
  if (appEnv === 'development') {
    Logger.log(`Swagger docs available at: http://localhost:${appPort}/docs`);
  }
}
bootstrap();
