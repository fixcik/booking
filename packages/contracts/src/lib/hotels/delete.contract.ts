import { Hotel } from '@prisma/client';

export const Topic = 'rpc.hotel-delete';
export const Queue = 'hotel-delete';

export interface Request {
  id: number;
}
export type Response = Hotel;
