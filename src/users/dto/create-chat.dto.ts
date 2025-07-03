import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Message } from "../entities/chat.entity";


export class CreateChatDto extends Message{

}
