import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuyService } from './cuy.service';
import { CreateCuyDto } from './dto/create-cuy.dto';
import { UpdateCuyDto } from './dto/update-cuy.dto';

@Controller('cuy')
export class CuyController {
  constructor(private readonly cuyService: CuyService) {}

  @Post()
  create(@Body() createCuyDto: CreateCuyDto) {
    return this.cuyService.create(createCuyDto);
  }

  @Get()
  findAll() {
    return this.cuyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuyDto: UpdateCuyDto) {
    return this.cuyService.update(+id, updateCuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuyService.remove(+id);
  }
}
