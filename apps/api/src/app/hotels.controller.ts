import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HotelContacts } from '@booking/contracts';
import { HotelCreateDto } from './dto/hotel-create.dto';
import { RoomCreateDto } from './dto/room-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('hotel')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get()
  getHotels() {
    return this.amqpConnection.request<HotelContacts.GetList.Response>({
      exchange: HotelContacts.Exchange,
      routingKey: HotelContacts.GetList.Topic,
      expiration: 10000
    });
  }

  @Post()
  createHotel(@Body() data: HotelCreateDto) {
    return this.amqpConnection.request<HotelContacts.Create.Response>({
      exchange: HotelContacts.Exchange,
      routingKey: HotelContacts.Create.Topic,
      payload: data,
      expiration: 10000
    });
  }

  @Delete('/:id')
  deleteHotel(@Param('id', ParseIntPipe) id: number) {
    return this.amqpConnection.request<HotelContacts.Delete.Response>({
      exchange: HotelContacts.Exchange,
      routingKey: HotelContacts.Delete.Topic,
      payload: { id },
      expiration: 10000
    });
  }

  @Post('/:id/rooms')
  createHotelRoom(
    @Param('id', ParseIntPipe) hotelId: number,
    @Body() data: RoomCreateDto
  ) {
    return this.amqpConnection.request<HotelContacts.Create.Response>({
      exchange: HotelContacts.Exchange,
      routingKey: HotelContacts.RoomCreate.Topic,
      payload: { hotelId, ...data },
      expiration: 10000
    });
  }

  @Delete('/:id/rooms/:roomId')
  deleteHotelRoom(
    @Param('id', ParseIntPipe) hotelId: number,
    @Param('roomId', ParseIntPipe) roomId: number
  ) {
    return this.amqpConnection.request<HotelContacts.RoomDelete.Response>({
      exchange: HotelContacts.Exchange,
      routingKey: HotelContacts.RoomDelete.Topic,
      payload: { roomId, hotelId },
      expiration: 10000
    });
  }
}
