import { Test, TestingModule } from '@nestjs/testing';
import { ShiftingService } from './shifting.service';

describe('ShiftingService', () => {
  let service: ShiftingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftingService],
    }).compile();

    service = module.get<ShiftingService>(ShiftingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
