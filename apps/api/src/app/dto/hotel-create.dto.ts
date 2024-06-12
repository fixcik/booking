import { HotelContacts } from '@booking/contracts';
import { IsNotEmpty, IsString } from 'class-validator';

export class HotelCreateDto implements HotelContacts.Create.Request {
  @IsNotEmpty()
  @IsString()
  name: string;
}
