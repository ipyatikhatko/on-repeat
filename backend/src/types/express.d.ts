// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      sub: number; // Adjust the type if necessary to match your token's payload structure
      email: string;
      // Add other properties if your JWT payload contains additional data
    };
  }
}
