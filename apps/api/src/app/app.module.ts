import { Module } from '@nestjs/common';

import { HotelsController } from './hotels.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
      defaultRpcTimeout: 10000,
    }),
  ],
  controllers: [HotelsController],
  providers: [],
})
export class AppModule {}
