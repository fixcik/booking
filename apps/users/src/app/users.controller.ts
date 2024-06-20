import { Controller } from '@nestjs/common';
import { UsersContracts } from '@booking/contracts';
import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe
} from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

@Controller()
export class UsersController {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly amqpConnection: AmqpConnection,
    private readonly emailService: EmailService
  ) {}
  @RabbitRPC({
    exchange: UsersContracts.Exchange,
    routingKey: UsersContracts.Register.Topic,
    queue: UsersContracts.Register.Queue
  })
  public async register(
    payload: UsersContracts.Register.Request
  ): Promise<UsersContracts.Register.Response> {
    const passwordHash = await bcrypt.hash(payload.password, 10);

    try {
      const user = await this.prismaClient.user.create({
        data: {
          email: payload.email,
          password: passwordHash,
          name: payload.name,
          role: payload.role
        }
      });

      await this.amqpConnection.publish(
        UsersContracts.Exchange,
        UsersContracts.CreatedEvent.Event,
        { user }
      );

      return { user, success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @RabbitSubscribe({
    exchange: UsersContracts.Exchange,
    routingKey: UsersContracts.CreatedEvent.Event,
    queue: UsersContracts.CreatedEvent.Queue
  })
  async onNewUser({ user }: UsersContracts.Register.Response) {
    await this.emailService.sendMail({
      to: user.email,
      subject: 'Welcome to Booking',
      text: `Welcome to Booking, ${user.name}`
    });
  }
}
