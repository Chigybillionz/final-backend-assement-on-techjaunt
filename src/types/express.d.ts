import { User as AppUser } from "../entities/User.entity";

declare global {
  namespace Express {
    interface User extends AppUser {}

    interface Request {
      user?: AppUser;
    }
  }
}

export {};
