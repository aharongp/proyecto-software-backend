
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message } from './entities/chat.entity';


@Injectable()
export class ChatsService {
  
  messages: Message[] = [{ name: 'Easyweb', text: 'En que le podemos ayudar?'}];
  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  create(createMessageDto: CreateChatDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    }
    this.messages.push(message);

    return message
  }

  findAll() {
    return this.messages;
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }


}
