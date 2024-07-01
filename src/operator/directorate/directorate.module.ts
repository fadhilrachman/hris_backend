import { Module } from '@nestjs/common';
import { DirectorateService } from './directorate.service';
import { DirectorateController } from './directorate.controller';

@Module({
  controllers: [DirectorateController],
  providers: [DirectorateService],
})
export class DirectorateModule {}
