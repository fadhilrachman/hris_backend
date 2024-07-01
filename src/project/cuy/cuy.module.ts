import { Module } from '@nestjs/common';
import { CuyService } from './cuy.service';
import { CuyController } from './cuy.controller';

@Module({
  controllers: [CuyController],
  providers: [CuyService],
})
export class CuyModule {}
