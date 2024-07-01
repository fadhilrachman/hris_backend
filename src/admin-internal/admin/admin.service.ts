import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/request';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAdminDto: CreateAdminDto) {
    const { email, name, password } = createAdminDto;

    const saltRounds = 10;
    const finallyPassword = await bcrypt.hash(password, saltRounds);

    const payload = {
      name,
      email,
      role: 'admin_internal',
      password: finallyPassword,
    };

    return payload;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
