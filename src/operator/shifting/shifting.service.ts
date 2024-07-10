import { Injectable } from '@nestjs/common';
import { CreateShiftingDto } from './dto/create-shifting.dto';
import { UpdateShiftingDto } from './dto/update-shifting.dto';

@Injectable()
export class ShiftingService {
  create(createShiftingDto: CreateShiftingDto) {
    return 'This action adds a new shifting';
  }

  findAll() {
    return `This action returns all shifting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shifting`;
  }

  update(id: number, updateShiftingDto: UpdateShiftingDto) {
    return `This action updates a #${id} shifting`;
  }

  remove(id: number) {
    return `This action removes a #${id} shifting`;
  }
}
