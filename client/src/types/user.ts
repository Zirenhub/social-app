import { ZUpdate, ZUserLogIn, ZUserSignUp } from 'shared';
import { z } from 'zod';

type TLogInData = z.infer<typeof ZUserLogIn>;
type TSignUpData = z.infer<typeof ZUserSignUp>;
type TUpdate = z.infer<typeof ZUpdate>;

export type { TLogInData, TSignUpData, TUpdate };
