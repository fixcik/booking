import { User, UserRole } from '@prisma/client';

export const Topic = 'rpc.user-register';
export const Queue = 'user-register';

export interface Request {
  password: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface Response {
  user?: User;
  success: boolean;
  error?: string;
}
