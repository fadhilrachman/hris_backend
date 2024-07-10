import { Injectable } from '@nestjs/common';
import { CreateAttendanceManagementDto } from './dto/create-attendance-management.dto';
import { UpdateAttendanceManagementDto } from './dto/update-attendance-management.dto';

@Injectable()
export class AttendanceManagementService {
  create(createAttendanceManagementDto: CreateAttendanceManagementDto) {
    return 'This action adds a new attendanceManagement';
  }

  findAll() {
    return `This action returns all attendanceManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendanceManagement`;
  }

  update(id: number, updateAttendanceManagementDto: UpdateAttendanceManagementDto) {
    return `This action updates a #${id} attendanceManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendanceManagement`;
  }
}
