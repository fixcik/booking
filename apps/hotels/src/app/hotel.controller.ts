import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HotelContacts } from '@booking/contracts';

@Controller()
export class HotelController {
  constructor(private readonly prismaClient: PrismaService) {}

  @RabbitRPC({
    exchange: HotelContacts.Exchange,
    routingKey: HotelContacts.GetList.Topic,
    queue: HotelContacts.GetList.Queue
  })
  public async getList({
    take = 10,
    skip
  }: HotelContacts.GetList.Request): Promise<HotelContacts.GetList.Response> {
    return this.prismaClient.hotel.findMany({
      take,
      skip
    });
  }

  @RabbitRPC({
    exchange: HotelContacts.Exchange,
    routingKey: HotelContacts.Create.Topic,
    queue: HotelContacts.Create.Queue
  })
  public async createHotel(
    hotel: HotelContacts.Create.Request
  ): Promise<HotelContacts.Create.Response> {
    return this.prismaClient.hotel.create({ data: hotel });
  }

  @RabbitRPC({
    exchange: HotelContacts.Exchange,
    routingKey: HotelContacts.Delete.Topic,
    queue: HotelContacts.Delete.Queue
  })
  public async deleteHotel({
    id
  }: HotelContacts.Delete.Request): Promise<HotelContacts.Delete.Response> {
    return this.prismaClient.hotel.delete({ where: { id } });
  }
}
