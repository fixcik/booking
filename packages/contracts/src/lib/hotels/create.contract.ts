import { Prisma } from '@prisma/client';

export const Topic = 'rpc.hotel-create';
export const Queue = 'hotel-create';

export type Request = Pick<Prisma.HotelCreateInput, 'name'>;
export interface Response {}
