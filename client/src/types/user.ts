import { ZUser, ZUserLogIn, ZUserSignUp } from 'shared';
import { z } from 'zod';

type TLogInData = z.infer<typeof ZUserLogIn>;
type TSignUpData = z.infer<typeof ZUserSignUp>;
type TUser = z.infer<typeof ZUser>;

export type { TLogInData, TSignUpData, TUser };
