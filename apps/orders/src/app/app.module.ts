import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { PrismaService } from './prisma.service';
import { OrderContacts } from '@booking/contracts';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
      enableControllerDiscovery: true,
      exchanges: [
        {
          name: OrderContacts.Exchange,
          type: 'topic'
        }
      ]
    })
  ],
  controllers: [OrdersController],
  providers: [PrismaService]
})
export class AppModule {}
