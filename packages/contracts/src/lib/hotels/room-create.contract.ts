import { Prisma } from '@prisma/client';

export const Topic = 'rpc.room-create';
export const Queue = 'room-create';

export type Request = Pick<
  Prisma.RoomTypeCreateInput,
  'name' | 'description' | 'maxOccupancy' | 'price'
>;
