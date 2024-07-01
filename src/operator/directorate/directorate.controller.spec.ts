import { Test, TestingModule } from '@nestjs/testing';
import { DirectorateController } from './directorate.controller';
import { DirectorateService } from './directorate.service';

describe('DirectorateController', () => {
  let controller: DirectorateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorateController],
      providers: [DirectorateService],
    }).compile();

    controller = module.get<DirectorateController>(DirectorateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
