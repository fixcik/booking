import { HotelContacts } from '@booking/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HotelCreateDto implements HotelContacts.Create.Request {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Hotel name' })
  name: string;
}
