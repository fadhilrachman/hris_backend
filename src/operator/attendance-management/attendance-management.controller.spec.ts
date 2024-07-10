import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceManagementController } from './attendance-management.controller';
import { AttendanceManagementService } from './attendance-management.service';

describe('AttendanceManagementController', () => {
  let controller: AttendanceManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceManagementController],
      providers: [AttendanceManagementService],
    }).compile();

    controller = module.get<AttendanceManagementController>(AttendanceManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
