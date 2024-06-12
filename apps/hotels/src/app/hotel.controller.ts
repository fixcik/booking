import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Hotel } from '@booking/contracts';

@Injectable()
export class HotelController {
  constructor(private readonly prismaClient: PrismaService) {}

  @RabbitRPC({
    exchange: Hotel.Exchange,
    routingKey: Hotel.GetList.Topic,
    queue: Hotel.GetList.Queue,
  })
  public async getList() {
    console.log('getList');
    return this.prismaClient.hotel.findMany({
      take: 10,
      include: { room_types: true },
    });
  }

  @RabbitRPC({
    exchange: Hotel.Exchange,
    routingKey: Hotel.Create.Topic,
    queue: Hotel.Create.Queue,
  })
  public async createHotel(hotel) {
    return this.prismaClient.hotel.create({ data: hotel });
  }

  @RabbitRPC({
    exchange: Hotel.Exchange,
    routingKey: Hotel.Delete.Topic,
    queue: Hotel.Delete.Queue,
  })
  public async deleteHotel({ id }) {
    return this.prismaClient.hotel.delete({ where: { id } });
  }
}
