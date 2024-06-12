import { Hotel } from '@booking/contracts';
import { IsNotEmpty, IsString } from 'class-validator';

export class HotelCreateDto implements Hotel.Create.Request {
  @IsNotEmpty()
  @IsString()
  name: string;
}
