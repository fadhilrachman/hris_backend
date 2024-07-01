import { Module } from '@nestjs/common';
import { CuyModule } from './cuy/cuy.module';

@Module({
  imports: [CuyModule]
})
export class ProjectModule {}
