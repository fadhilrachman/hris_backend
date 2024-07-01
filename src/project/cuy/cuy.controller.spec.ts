import { Test, TestingModule } from '@nestjs/testing';
import { CuyController } from './cuy.controller';
import { CuyService } from './cuy.service';

describe('CuyController', () => {
  let controller: CuyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuyController],
      providers: [CuyService],
    }).compile();

    controller = module.get<CuyController>(CuyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
