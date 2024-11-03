import { z } from "zod";

function getMinCharError(field: string, minChar: number) {
  return { message: `${field} must be ${minChar} or more characters long.` };
}

function getMaxCharError(field: string, maxChar: number) {
  return { message: `${field} must be no longer than ${maxChar} characters.` };
}

const UserSignUpWithoutPasswords = z.object({
  username: z
    .string()
    .trim()
    .min(3, getMinCharError("Username", 3))
    .max(14, getMaxCharError("Username", 14)),
  firstName: z
    .string()
    .trim()
    .min(3, getMinCharError("First Name", 3))
    .max(14, getMaxCharError("First Name", 14)),
  lastName: z
    .string()
    .trim()
    .min(3, getMinCharError("Last Name", 3))
    .max(14, getMaxCharError("Last Name", 14)),
  day: z.number().min(1, "Day is required").max(31),
  month: z.number().min(0, "Month is required").max(11),
  year: z.number().min(1900, "Year is required").max(new Date().getFullYear()),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "Invalid gender." }),
  bio: z.string().trim().max(160, getMaxCharError("Bio", 160)).optional(),
  email: z
    .string()
    .trim()
    .max(32, { message: "Email address can't be longer than 32 characters" })
    .email({ message: "Invalid email address." }),
});

const Passwords = z
  .object({
    password: z
      .string()
      .trim()
      .min(3, getMinCharError("Password", 3))
      .max(18, getMaxCharError("Password", 18)),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Refine validations on object definitions don't get triggered until all fields in the object exist.
// need this because before continuing to the second page of our form
// we first must verify that passwords match
// since only some of the fields are on the first page of our form
// refine validations dont get triggerd
// hacky solution
const ZUserSignUp = z.intersection(UserSignUpWithoutPasswords, Passwords);
const { shape } = UserSignUpWithoutPasswords;
const ZUpdate = z.object({
  firstName: shape.firstName,
  lastName: shape.lastName,
  bio: shape.bio,
});

const ZUserLogIn = z.object({
  email: z
    .string()
    .trim()
    .max(32, { message: "Email address can't be longer than 32 characters" })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .trim()
    .min(3, getMinCharError("Password", 3))
    .max(18, getMaxCharError("Password", 18)),
});

export { ZUserSignUp, ZUserLogIn, ZUpdate };
