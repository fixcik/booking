import { Prisma, Hotel } from '@prisma/client';

export const Topic = 'rpc.hotel-create';
export const Queue = 'hotel-create';

export type Request = Omit<
  Prisma.HotelUncheckedCreateInput,
  'createdAt' | 'updatedAt' | 'room_types'
>;
export type Response = Hotel;
