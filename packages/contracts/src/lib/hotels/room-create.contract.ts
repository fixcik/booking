import { Prisma, RoomType } from '@prisma/client';

export const Topic = 'rpc.room-create';
export const Queue = 'room-create';

export interface Request
  extends Pick<
    Prisma.RoomTypeCreateInput,
    'name' | 'description' | 'maxOccupancy' | 'price'
  > {
  hotelId: number;
}

export type Response = RoomType;
