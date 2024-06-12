import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from './prisma.service';
import { HotelController } from './hotel.controller';
import { RoomTypeController } from './room-type.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
    }),
  ],
  controllers: [],
  providers: [HotelController, RoomTypeController, PrismaService],
})
export class AppModule {}
