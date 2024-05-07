import {Module} from '@nestjs/common';
import {EventsGateway} from './events.gateway';
import { MessageService } from '../message/message.service';

@Module({
  providers: [EventsGateway, MessageService],
  exports: [EventsGateway],
})
export class EventsModule {
}
