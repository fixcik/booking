import { Controller } from '@nestjs/common';
import { OrderContacts } from '@booking/contracts';
import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe
} from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from './prisma.service';
import { Order, OrderStatus, Prisma } from '@prisma/client';
@Controller()
export class OrdersController {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly amqpConnection: AmqpConnection
  ) {}
  @RabbitRPC({
    exchange: OrderContacts.Exchange,
    routingKey: OrderContacts.Create.Topic,
    queue: OrderContacts.Create.Queue
  })
  public async createOrder({
    roomTypeId,
    ...order
  }: OrderContacts.Create.Request): Promise<OrderContacts.Create.Response> {
    try {
      const createdOrder = await this.prismaClient.order.create({
        data: {
          ...order,
          status: OrderStatus.PENDING,
          roomType: { connect: { id: roomTypeId } },
          user: {
            connect: { id: 1 }
          },
          totalPrice: 0
        }
      });

      await this.amqpConnection.publish(
        OrderContacts.Exchange,
        OrderContacts.CreatedEvent.Event,
        { order: createdOrder }
      );

      return {
        success: true,
        data: createdOrder
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("No 'RoomType' record(s)")) {
          // The error is a missing RoomType record error, return a custom error message
          return {
            success: false,
            error: 'RoomType not found',
            details: 'The specified RoomType was not found in the database'
          };
        } else {
          return {
            success: false,
            error: error.message
          };
        }
      } else {
        return {
          success: false,
          error: 'Failed to create order',
          details: error.message
        };
      }
    }
  }

  @RabbitSubscribe({
    exchange: OrderContacts.Exchange,
    routingKey: OrderContacts.CreatedEvent.Event,
    queue: OrderContacts.CreatedEvent.Queue
  })
  async onNewOrder({ order }: { order: Order }) {
    // Handle new order event
    console.log(order, 'new order');
    await this.prismaClient.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.CONFIRMED }
    });
  }
}
