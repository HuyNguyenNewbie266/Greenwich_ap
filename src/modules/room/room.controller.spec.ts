import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { Campus } from '../user/entities/campus.entity';

describe('RoomController', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        RoomService,
        { provide: getRepositoryToken(Room), useClass: Repository },
        { provide: getRepositoryToken(Campus), useClass: Repository },
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
