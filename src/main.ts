import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:false})
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(4200)
}
bootstrap()
