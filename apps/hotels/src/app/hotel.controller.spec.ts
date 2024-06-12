import { Test, TestingModule } from '@nestjs/testing';
import { HotelController } from './hotel.controller';
import { PrismaService } from './prisma.service';

describe('HotelService', () => {
  let service: HotelController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelController,
        {
          provide: PrismaService,
          useValue: {
            hotel: {
              findMany: jest.fn(),
              create: jest.fn(),
              delete: jest.fn()
            }
          }
        }
      ]
    }).compile();

    service = module.get<HotelController>(HotelController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getList', () => {
    it('should return an array of hotels', async () => {
      const result = ['test'];
      jest
        .spyOn(prismaService.hotel, 'findMany')
        .mockResolvedValue(
          result as unknown as ReturnType<typeof prismaService.hotel.findMany>
        );

      expect(await service.getList({})).toBe(result);
    });
  });

  describe('createHotel', () => {
    it('should create a hotel', async () => {
      const hotel = {
        name: 'Test Hotel',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = { id: 1, ...hotel };
      jest.spyOn(prismaService.hotel, 'create').mockResolvedValue(result);

      expect(await service.createHotel(hotel)).toBe(result);
    });
  });

  describe('deleteHotel', () => {
    it('should delete a hotel', async () => {
      const id = 1;
      const result = { id };
      jest
        .spyOn(prismaService.hotel, 'delete')
        .mockResolvedValue(
          result as unknown as ReturnType<typeof prismaService.hotel.delete>
        );

      expect(await service.deleteHotel({ id })).toBe(result);
    });
  });
});
