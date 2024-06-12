import { Prisma } from '@prisma/client';

export const Topic = 'rpc.order-create';
export const Queue = 'order-create';

export interface Request
  extends Omit<
    Prisma.OrderUncheckedCreateInput,
    'id' | 'createdAt' | 'updatedAt' | 'status' | 'userId' | 'totalPrice'
  > {}

export interface Response {}
