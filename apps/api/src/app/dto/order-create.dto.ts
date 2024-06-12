import { OrderContacts } from '@booking/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class OrderCreateDto implements OrderContacts.Create.Request {
  @ApiProperty()
  @IsNumber()
  roomTypeId: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsISO8601()
  checkInDate: string;
  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsISO8601()
  checkOutDate: string;
}
