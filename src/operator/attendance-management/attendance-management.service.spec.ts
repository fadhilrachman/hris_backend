import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceManagementService } from './attendance-management.service';

describe('AttendanceManagementService', () => {
  let service: AttendanceManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceManagementService],
    }).compile();

    service = module.get<AttendanceManagementService>(AttendanceManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
