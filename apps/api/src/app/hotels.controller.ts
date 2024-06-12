import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Hotel } from '@booking/contracts';
import { HotelCreateDto } from './dto/hotel-create.dto';
import { RoomCreateDto } from './dto/room-create.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get()
  getHotels() {
    return this.amqpConnection.request({
      exchange: Hotel.Exchange,
      routingKey: Hotel.GetList.Topic,
      expiration: 10000,
    });
  }

  @Post()
  createHotel(@Body() data: HotelCreateDto) {
    return this.amqpConnection.request({
      exchange: Hotel.Exchange,
      routingKey: Hotel.Create.Topic,
      payload: data,
      expiration: 10000,
    });
  }

  @Post('/:id/rooms')
  createHotelRoom(
    @Param('id', ParseIntPipe) hotelId: number,
    @Body() data: RoomCreateDto
  ) {
    return this.amqpConnection.request({
      exchange: Hotel.Exchange,
      routingKey: Hotel.RoomCreate.Topic,
      payload: { hotelId, ...data },
      expiration: 10000,
    });
  }

  @Delete('/:id')
  deleteHotel(@Param('id', ParseIntPipe) id: number) {
    return this.amqpConnection.request({
      exchange: Hotel.Exchange,
      routingKey: Hotel.Delete.Topic,
      payload: { id },
      expiration: 10000,
    });
  }
}
