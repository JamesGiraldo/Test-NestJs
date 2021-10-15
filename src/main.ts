import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

import { PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get( ConfigService );
  /** server port */
  const port = configService.get<number>(PORT) || 3000;
  await app.listen(port);
  console.log( "listening on port ", await app.getUrl() )
}
bootstrap();
