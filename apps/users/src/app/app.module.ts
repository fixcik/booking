import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from './prisma.service';
import { UsersContracts } from '@booking/contracts';
import { EmailService } from './email.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
      enableControllerDiscovery: true,
      exchanges: [
        {
          name: UsersContracts.Exchange,
          type: 'direct'
        }
      ]
    })
  ],
  controllers: [UsersController],
  providers: [PrismaService, EmailService]
})
export class AppModule {}
