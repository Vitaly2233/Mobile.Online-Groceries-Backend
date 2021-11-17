import { User } from 'src/user/schema/user.schema';

export type UserWIthoutPassword = Omit<User, 'password'>;
