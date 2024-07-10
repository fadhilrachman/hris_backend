import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceManagementService } from './attendance-management.service';
import { CreateAttendanceManagementDto } from './dto/create-attendance-management.dto';
import { UpdateAttendanceManagementDto } from './dto/update-attendance-management.dto';

@Controller('attendance-management')
export class AttendanceManagementController {
  constructor(private readonly attendanceManagementService: AttendanceManagementService) {}

  @Post()
  create(@Body() createAttendanceManagementDto: CreateAttendanceManagementDto) {
    return this.attendanceManagementService.create(createAttendanceManagementDto);
  }

  @Get()
  findAll() {
    return this.attendanceManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceManagementDto: UpdateAttendanceManagementDto) {
    return this.attendanceManagementService.update(+id, updateAttendanceManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceManagementService.remove(+id);
  }
}
