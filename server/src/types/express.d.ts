import { User, Profile } from "@prisma/client";
import { TAuthUserApi } from "@shared";

declare global {
  namespace Express {
    interface Request {
      user?: TAuthUserApi;
    }
  }
}
