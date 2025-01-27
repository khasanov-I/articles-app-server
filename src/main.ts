import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors')
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: '/etc/letsencrypt/live/articlesplatform.ru/privkey.pem',
      cert: '/etc/letsencrypt/live/articlesplatform.ru/fullchain.pem'
    }
  });
  // User.sync({alter: true})
  // Article.sync({alter: true})
  app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
  app.use(cookieParser())
  await app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
  });
}

bootstrap()
