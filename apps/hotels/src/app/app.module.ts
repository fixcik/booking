import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from './prisma.service';
import { HotelController } from './hotel.controller';
import { RoomTypeController } from './room-type.controller';
import { HotelContacts } from '@booking/contracts';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
      exchanges: [
        {
          name: HotelContacts.Exchange,
          type: 'direct'
        }
      ]
    })
  ],
  controllers: [],
  providers: [
    HotelController,
    RoomTypeController,
    {
      provide: PrismaService,
      useFactory: () => new PrismaService({ log: ['query'] })
    }
  ]
})
export class AppModule {}
