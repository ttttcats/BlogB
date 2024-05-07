import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as fs from "fs";
import * as https from "https";
async function bootstrap() {

  // const httpsOptions = {
  //   key: fs.readFileSync("./key.pem"),
  //   cert: fs.readFileSync("./cert.pem"),
  // };
  const app = await NestFactory.create(AppModule );
  // const app = await NestFactory.create(AppModule , {
  //   httpsOptions
  // });
  app.enableCors({
    // origin:true ,
    // credentials : true

    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  await app.listen(9090);
}
bootstrap();
