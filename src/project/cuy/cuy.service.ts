import { Injectable } from '@nestjs/common';
import { CreateCuyDto } from './dto/create-cuy.dto';
import { UpdateCuyDto } from './dto/update-cuy.dto';

@Injectable()
export class CuyService {
  create(createCuyDto: CreateCuyDto) {
    return 'This action adds a new cuy';
  }

  findAll() {
    return `This action returns all cuy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuy`;
  }

  update(id: number, updateCuyDto: UpdateCuyDto) {
    return `This action updates a #${id} cuy`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuy`;
  }
}
