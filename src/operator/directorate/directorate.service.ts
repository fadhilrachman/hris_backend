import { Injectable } from '@nestjs/common';
import { CreateDirectorateDto } from './dto/create-directorate.dto';
import { UpdateDirectorateDto } from './dto/update-directorate.dto';

@Injectable()
export class DirectorateService {
  create(createDirectorateDto: CreateDirectorateDto) {
    return 'This action adds a new directorate';
  }

  findAll() {
    return `This action returns all directorate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} directorate`;
  }

  update(id: number, updateDirectorateDto: UpdateDirectorateDto) {
    return `This action updates a #${id} directorate`;
  }

  remove(id: number) {
    return `This action removes a #${id} directorate`;
  }
}
