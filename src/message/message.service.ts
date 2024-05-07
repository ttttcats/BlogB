import { ExtendedPrismaClient, extendedPrismaClient } from './../prisma.extension';
import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
@Injectable()
export class MessageService {

  constructor(
    @Inject('PrismaService')
    private readonly prisma : CustomPrismaService<ExtendedPrismaClient>
  ) {

  }
  create(createMessageDto: CreateMessageDto) {
    
    return this.prisma.client.message.create({
      
      data:{
      
        content : createMessageDto.content ,
        color:createMessageDto.color ,
        createdAt : createMessageDto.createdAt
      }
    })

    // const message = {
    //   content : createMessageDto.content ,
    //   color:createMessageDto.color ,
    //   createdAt : createMessageDto.createdAt
    // }
    // console.log('create :: ', message);
    // return message;
  }

  findAll() {
    // return `This action returns all message`;
    // return this.prisma.message.findMany();
    
    
  }
  async findMany() {

   const result = await this.prisma.client.message.findMany({
    select:{
      messageId : true ,
      color : true , 
      content : true ,
      createdAt : true

      
    },
    orderBy:[
      {
        createdAt : 'desc'
      }
    ]
    
  })
    return result;
    // return 'This action adds a new message dsadasdasd';
    // return this.prismaService.client.message.findMany({
    //   where:{
          
    //   },
    //   orderBy:{
    //     messageId:'desc'
    //   },
    //   take:30
    // })
  }
  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove() {
    return this.prisma.client.message.delete;
  }
}
