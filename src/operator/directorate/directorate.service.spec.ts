import { Test, TestingModule } from '@nestjs/testing';
import { DirectorateService } from './directorate.service';

describe('DirectorateService', () => {
  let service: DirectorateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectorateService],
    }).compile();

    service = module.get<DirectorateService>(DirectorateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
