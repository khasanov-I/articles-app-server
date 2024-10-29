import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './users/users.model';
const cors = require('cors')
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // User.sync({alter: true})
  app.use(cors())
  app.use(cookieParser())
  await app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
  });
}

bootstrap()
