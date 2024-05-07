import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { onlineMap } from './onlineMap';
import {CreateMessageDto} from "../message/dto/create-message.dto";
import { MessageService } from '../message/message.service';

@WebSocketGateway({  namespace: 'messages', transports: ['websocket']})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;

  constructor(
    private messageService: MessageService,
    
  ) {}

  @SubscribeMessage('test')
  handleTest(@MessageBody() data: string) {
    
    console.log('test ::' , data);

  }
  @SubscribeMessage('delete')
  async ( @ConnectedSocket() socket: Socket) {
    return this.messageService.remove();
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() socket: Socket) {
    const message = await this.messageService.create(data);
    console.log('message ::' , message);
    // const ids = [data._id];
    // ids.sort(); 
    socket.to('room').emit('receiveMessage', message);
    socket.emit('receiveMessage', message);
    // const receiverSocketId = onlineMap[data._id];
    // if (receiverSocketId) {
    // }
  }

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: { id: number },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('websocket login', data.id);
    onlineMap[data.id] = socket.id;
  }

  afterInit(server: Server): any {
    console.log('init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.join('room')
    
    console.log('connected', socket.nsp.name);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnected', socket.nsp.name);
  }
}