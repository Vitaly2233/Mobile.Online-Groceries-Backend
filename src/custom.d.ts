import { UserDocument } from './user/schema/user.schema';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserDocument;
  }
}
