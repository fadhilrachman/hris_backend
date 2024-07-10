import { Global, Module } from '@nestjs/common';
import { LogActivityService } from './log-activity.service';
@Global()
@Module({
  providers: [LogActivityService],
  exports: [LogActivityService],
})
export class LogActivityModule {}
