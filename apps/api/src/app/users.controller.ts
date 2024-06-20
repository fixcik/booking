import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/user-register.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UsersContracts } from '@booking/contracts';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() payload: UserRegisterDto) {
    return this.amqpConnection.request({
      exchange: UsersContracts.Exchange,
      routingKey: UsersContracts.Register.Topic,
      payload
    });
  }
}
