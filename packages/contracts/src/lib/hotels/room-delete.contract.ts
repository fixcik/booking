import { RoomType } from '@prisma/client';

export const Topic = 'rpc.room-delete';
export const Queue = 'room-delete';

export interface Request {
  roomId: number;
  hotelId: number;
}
export type Response = RoomType;
