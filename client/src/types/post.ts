import { ZPost } from 'shared';
import { z } from 'zod';

type TPost = z.infer<typeof ZPost>;

export type { TPost };
