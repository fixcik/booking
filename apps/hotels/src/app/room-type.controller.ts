import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HotelContacts } from '@booking/contracts';

@Injectable()
export class RoomTypeController {
  constructor(private readonly prismaClient: PrismaService) {}

  @RabbitRPC({
    exchange: HotelContacts.Exchange,
    routingKey: HotelContacts.RoomCreate.Topic,
    queue: HotelContacts.RoomCreate.Queue
  })
  public async createRoom(
    data: HotelContacts.RoomCreate.Request
  ): Promise<HotelContacts.RoomCreate.Response> {
    return this.prismaClient.roomType.create({ data });
  }

  @RabbitRPC({
    exchange: HotelContacts.Exchange,
    routingKey: HotelContacts.RoomDelete.Topic,
    queue: HotelContacts.RoomDelete.Queue
  })
  public async deleteRoom({
    roomId,
    hotelId
  }: HotelContacts.RoomDelete.Request): Promise<HotelContacts.RoomDelete.Response> {
    return this.prismaClient.roomType.delete({
      where: { id: roomId, hotelId }
    });
  }
}
