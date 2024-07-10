import { Test, TestingModule } from '@nestjs/testing';
import { ShiftingController } from './shifting.controller';
import { ShiftingService } from './shifting.service';

describe('ShiftingController', () => {
  let controller: ShiftingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftingController],
      providers: [ShiftingService],
    }).compile();

    controller = module.get<ShiftingController>(ShiftingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
