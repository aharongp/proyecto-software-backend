import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    );

    createUserDto.password = hashedPassword;

    return this.prisma.users.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing
      )
    }

    return this.prisma.users.update({
      where: { id },
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
