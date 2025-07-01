
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message } from './entities/chat.entity';


@Injectable()
export class ChatsService {
  
  messages: Message[] = [];
  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  create(createMessageDto: CreateChatDto, clientId: string, nameRoom: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
      nameRoom: nameRoom
    }
    this.messages.push(message);

    return message
  }

  findAllByRoom(roomName: string) {
    return this.messages.filter((message) => message.nameRoom === roomName);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }


}
