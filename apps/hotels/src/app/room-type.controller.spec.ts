import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypeController } from './room-type.controller';
import { PrismaService } from './prisma.service';
import { HotelContacts } from '@booking/contracts';
import { RoomType } from '@prisma/client';

describe('RoomTypeController', () => {
  let controller: RoomTypeController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTypeController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            roomType: {
              create: jest.fn(),
              delete: jest.fn()
            }
          }
        }
      ]
    }).compile();

    controller = module.get<RoomTypeController>(RoomTypeController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRoom', () => {
    it('should create a room', async () => {
      const roomData: HotelContacts.RoomCreate.Request = {
        hotelId: 1,
        name: 'Test Room',
        maxOccupancy: 2,
        price: 1000
      };

      const room = { id: 1, description: '', ...roomData };

      jest.spyOn(prismaService.roomType, 'create').mockResolvedValue(room);

      const result = await controller.createRoom(roomData);

      expect(prismaService.roomType.create).toHaveBeenCalledWith({
        data: roomData
      });
      expect(result).toEqual(room); // or whatever your create method returns
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room', async () => {
      const request: HotelContacts.RoomDelete.Request = {
        roomId: 1,
        hotelId: 1
      };

      jest
        .spyOn(prismaService.roomType, 'delete')
        .mockResolvedValue({ id: request.roomId } as RoomType);

      const result = await controller.deleteRoom(request);

      expect(prismaService.roomType.delete).toHaveBeenCalledWith({
        where: { id: request.roomId, hotelId: request.hotelId }
      });
      expect(result).toEqual({ id: request.roomId }); // or whatever your delete method returns
    });
  });
});
