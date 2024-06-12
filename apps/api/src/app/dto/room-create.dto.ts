import { Hotel } from '@booking/contracts';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomCreateDto implements Hotel.RoomCreate.Request {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description?: string;
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  maxOccupancy: number;
  @IsNumber({ allowNaN: false })
  price: number;
}
