import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/logic/users.module';
import { OrdersModule } from './orders/logic/orders.module';
import { ChatsModule } from './users/logic/chats.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/logic/auth.module';
import { CatalogoModule } from './catalogo/logic/catalogo.module';

@Module({
  imports: [UsersModule, OrdersModule, ChatsModule, PrismaModule, AuthModule, CatalogoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
