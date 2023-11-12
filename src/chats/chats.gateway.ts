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

  // @SubscribeMessage('findAllChats')
  // findAll() {
  //   return this.chatsService.findAll();
  // }

  // @SubscribeMessage('join')
  // joinRoom(
  //   @MessageBody('name') name: UserEntity,
  //   @ConnectedSocket() client: Socket
  //  ){

  //   const roomName = name.username
  //   client.join(roomName);
  //   this.server.on('connection', () => console.log(roomName))
  //   return this.chatsService.identify(name);
  // }

  // @SubscribeMessage('typing')
  // async typing(
  //   @MessageBody('isTyping') isTyping: boolean,
  //   @ConnectedSocket() client: Socket
  //   ) {
  //     const name = await this.chatsService.getClientName(client.id);

  //     client.broadcast.emit('typing', {name, isTyping});
  // }
  
  // @SubscribeMessage('createChat')
  // async create(
  //   @MessageBody() createChatDto: CreateChatDto, 
  //   @ConnectedSocket() client: Socket
  //   ) {
    
  //   const message = await this.chatsService.create(createChatDto, client.id);
    
  //   const user = this.chatsService.getUser(client.id);

  //   this.server.to(user.name).emit('message', {message, user});

  //   return message
  // }


  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatsService.remove(id);
  // }
}
