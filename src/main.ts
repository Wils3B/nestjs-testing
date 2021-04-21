import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import './db';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.listen(5000, () => console.log('Application is listening on port 5000.'));
}
bootstrap();