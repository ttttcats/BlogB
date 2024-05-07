import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MessageModule } from './message/message.module';
import { RouterModule } from '@nestjs/core';
import { MessageService } from './message/message.service';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
     MessageModule ,
     ConfigModule.forRoot({
      isGlobal: true,
    }),
     CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      isGlobal: true,
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
     EventsModule,
    //  CustomPrismaModule.forRootAsync({
    //   name: 'PrismaService',
    //   isGlobal: true,
    //   useFactory: () => {
    //     return extendedPrismaClient;
    //   },
    // }),
  // RouterModule.register([
  //   {
  //     path:"api" ,
  //     module:MessageModule
  //   }
  // ])
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly configService: ConfigService
    ,
  ) {}
}
