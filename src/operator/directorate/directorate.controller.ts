import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorateService } from './directorate.service';
import { CreateDirectorateDto } from './dto/create-directorate.dto';
import { UpdateDirectorateDto } from './dto/update-directorate.dto';

@Controller('directorate')
export class DirectorateController {
  constructor(private readonly directorateService: DirectorateService) {}

  @Post()
  create(@Body() createDirectorateDto: CreateDirectorateDto) {
    return this.directorateService.create(createDirectorateDto);
  }

  @Get()
  findAll() {
    return this.directorateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorateDto: UpdateDirectorateDto) {
    return this.directorateService.update(+id, updateDirectorateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorateService.remove(+id);
  }
}
