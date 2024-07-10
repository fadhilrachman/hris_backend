import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftingService } from './shifting.service';
import { CreateShiftingDto } from './dto/create-shifting.dto';
import { UpdateShiftingDto } from './dto/update-shifting.dto';

@Controller('shifting')
export class ShiftingController {
  constructor(private readonly shiftingService: ShiftingService) {}

  @Post()
  create(@Body() createShiftingDto: CreateShiftingDto) {
    return this.shiftingService.create(createShiftingDto);
  }

  @Get()
  findAll() {
    return this.shiftingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftingDto: UpdateShiftingDto) {
    return this.shiftingService.update(+id, updateShiftingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftingService.remove(+id);
  }
}
