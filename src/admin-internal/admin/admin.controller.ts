import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/request';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/database/database.service';
import { ValidationPipeCustom } from '../../pipes/validation.pipe';

@ApiTags('Admin')
@UsePipes(ValidationPipeCustom)
@Controller('admin-internal/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post()
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    // throw new BadRequestException('Validation failed');

    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.databaseService.user.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
