import { Hotel } from '@prisma/client';

export const Topic = 'rpc.hotel-list';
export const Queue = 'hotel-list';

export interface Request {
  take?: number;
  skip?: number;
}
export type Response = Array<Hotel>;
