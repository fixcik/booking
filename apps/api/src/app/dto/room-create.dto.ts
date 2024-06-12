import { HotelContacts } from '@booking/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomCreateDto
  implements Omit<HotelContacts.RoomCreate.Request, 'hotelId'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @ApiProperty()
  maxOccupancy: number;

  @IsNumber({ allowNaN: false })
  @ApiProperty()
  price: number;
}
