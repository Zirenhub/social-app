import { z } from 'zod';

const User = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First Name must be 3 or more characters long.' })
    .max(14, {
      message: 'First Name must be no longer than 14 characters.',
    }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last Name must be 3 or more characters long.' })
    .max(14, {
      message: 'Last Name must be no longer than 14 characters.',
    }),
  dateOfBirth: z.date({ message: 'Invalid date string!' }),
  gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender.' }),
  email: z
    .string()
    .trim()
    .max(18, { message: "Email address can't be longer than 18 characters" })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .trim()
    .min(3, { message: 'Password must be 3 or more characters long.' })
    .max(18, {
      message: 'Password must be no longer than 18 characters.',
    }),
});

export default User;
