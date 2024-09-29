import { User, Profile } from "@prisma/client";
import { TAuthUser } from "@shared";

declare global {
  namespace Express {
    interface Request {
      user?: TAuthUser;
    }
  }
}
