import { OrderContacts } from '@booking/contracts';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderCreateDto } from './dto/order-create.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Post()
  createOrder(@Body() order: OrderCreateDto) {
    return this.amqpConnection.request<OrderContacts.Create.Response>({
      exchange: OrderContacts.Exchange,
      routingKey: OrderContacts.Create.Topic,
      payload: order,
      expiration: 10000
    });
  }
}
