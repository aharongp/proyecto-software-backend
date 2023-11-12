import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatsGateway {

  @WebSocketServer()
  server: Server

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket
  ) {
      const handshake = client.id;

      let { nameRoom } = client.handshake.query;
      console.log(`Nuevo dispositivo: ${handshake} conectado a la ${nameRoom}`);
      client.join(nameRoom)
      
      const message = this.chatsService.create(createChatDto, client.id);
  
      this.server.to(nameRoom).emit('message', message);
      return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.chatsService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
   ){
    return this.chatsService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
    ) {
      let { nameRoom } = client.handshake.query;

      const name = await this.chatsService.getClientName(client.id);

      client.broadcast.to(nameRoom).emit('typing', {name, isTyping});
  }

}
