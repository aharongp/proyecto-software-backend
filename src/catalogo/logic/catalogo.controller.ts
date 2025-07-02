import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CreateCatalogoDto } from '../dto/create-catalogo.dto';
import { UpdateCatalogoDto } from '../dto/update-catalogo.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Catalogo } from '../entities/catalogo.entity';
import { JwtAuthGuard } from 'src/auth/logic/jwt-auth.guard';

@Controller('catalogo')
export class CatalogoController {

  constructor(private readonly catalogoService: CatalogoService) {}

  @Post('create')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Catalogo })
  create(@Body() createCatalogoDto: CreateCatalogoDto) {
    return this.catalogoService.create(createCatalogoDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Catalogo, isArray: true })
  findAll() {
    return this.catalogoService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Catalogo })
  findOne(@Param('id') id: string) {
    return this.catalogoService.findOne(+id);
  }


  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Catalogo })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatalogoDto: UpdateCatalogoDto) {
    return this.catalogoService.update(id, updateCatalogoDto);
  }


  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Catalogo })
  remove(@Param('id') id: string) {
    return this.catalogoService.remove(+id);
  }
}
