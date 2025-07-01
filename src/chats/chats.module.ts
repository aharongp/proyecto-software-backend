import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ChatsGateway, ChatsService],
  imports: [PrismaModule],
})
export class ChatsModule {}
