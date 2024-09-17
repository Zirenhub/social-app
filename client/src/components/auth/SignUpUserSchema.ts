import { z } from 'zod';

const User = z
  .object({
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
    day: z.number().min(1, 'Day is required').max(31),
    month: z.number().min(0, 'Month is required').max(11),
    year: z
      .number()
      .min(1900, 'Year is required')
      .max(new Date().getFullYear()),
    gender: z.enum(['male', 'female', 'other'], { message: 'Invalid gender.' }),
    email: z
      .string()
      .trim()
      .max(32, { message: "Email address can't be longer than 32 characters" })
      .email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .trim()
      .min(3, { message: 'Password must be 3 or more characters long.' })
      .max(18, {
        message: 'Password must be no longer than 18 characters.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export default User;
