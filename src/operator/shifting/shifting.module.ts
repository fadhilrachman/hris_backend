import { Module } from '@nestjs/common';
import { ShiftingService } from './shifting.service';
import { ShiftingController } from './shifting.controller';

@Module({
  controllers: [ShiftingController],
  providers: [ShiftingService],
})
export class ShiftingModule {}
