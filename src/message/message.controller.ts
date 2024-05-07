import { Message } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message as MessageDeco  } from 'src/common/decorators/message.decorator';
import {Message as MessageEntity} from './entities/Message.entity';
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Post()
  findMany() {
    return this.messageService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete('/delete')
  remove() {
    return this.messageService.remove();
  }
}
