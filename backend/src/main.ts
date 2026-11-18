import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  // TODO: configure global validation and security headers.
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
