import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:false})
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT,'0.0.0.0');
}
bootstrap()
