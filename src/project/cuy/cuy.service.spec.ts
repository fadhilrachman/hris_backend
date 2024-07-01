import { Test, TestingModule } from '@nestjs/testing';
import { CuyService } from './cuy.service';

describe('CuyService', () => {
  let service: CuyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuyService],
    }).compile();

    service = module.get<CuyService>(CuyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
