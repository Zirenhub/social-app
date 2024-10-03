import { ZUserLogIn, ZUserSignUp } from 'shared';
import { z } from 'zod';

type TLogInData = z.infer<typeof ZUserLogIn>;
type TSignUpData = z.infer<typeof ZUserSignUp>;

export type { TLogInData, TSignUpData };
