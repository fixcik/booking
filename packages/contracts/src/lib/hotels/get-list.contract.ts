import { Hotel } from '@prisma/client';

export const Topic = 'rpc.hotel-list';
export const Queue = 'hotel-list';

export type Response = Array<Hotel>;
