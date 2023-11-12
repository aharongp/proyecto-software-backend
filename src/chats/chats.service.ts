
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

  // constructor(private prisma: PrismaService){}
  
  // clientToUser = {};

  // identify(name: UserEntity) {
  //   this.clientToUser[name.username] = name;
  // }

  // async create(createChatDto: CreateChatDto, clientId: string) {

  //   const user = this.clientToUser[clientId];

  //   const message = {
  //     clientId: user.id,
  //     text: createChatDto.text
  //   }

  //   const savedMsg = await this.prisma.chat.create({ data: message });
    
  //   return savedMsg
  // }

  // findAll() {
  //   const messages = this.prisma.chat.findMany();
  //   return messages;
  // }

  // async getClientName(clientId: string) {
  //   const message = await this.prisma.users.findUnique({
  //     where: { username: this.clientToUser[clientId] },
  //   });

  //   return message.username;
  // }

  // getUser(clientId: string) {
    
  //   return this.clientToUser[clientId]; 
  // }

  // remove(id: number) {
  //   return this.prisma.chat.delete({where: { id } });
  // }
}
