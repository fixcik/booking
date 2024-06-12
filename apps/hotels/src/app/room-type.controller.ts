import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Hotel } from '@booking/contracts';

@Injectable()
export class RoomTypeController {
  constructor(private readonly prismaClient: PrismaService) {}

  @RabbitRPC({
    exchange: Hotel.Exchange,
    routingKey: Hotel.RoomCreate.Topic,
    queue: Hotel.RoomCreate.Queue,
  })
  public async createRoom(data) {
    return this.prismaClient.roomType.create({ data });
  }

  @RabbitRPC({
    exchange: Hotel.Exchange,
    routingKey: Hotel.RoomDelete.Topic,
    queue: Hotel.RoomDelete.Queue,
  })
  public async deleteRoom({ id }) {
    return this.prismaClient.roomType.delete({ where: { id } });
  }
}
