import { z } from "zod";

const postContentMaxLength = 255;

const ZPost = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Post cant be empty." })
    .max(postContentMaxLength, {
      message: `Post cant be longer than ${postContentMaxLength} characters.`,
    }),
  visibility: z.enum(["EVERYONE", "FRIENDS"], {
    message: "Invalid visibility.",
  }),
  imageUrl: z.string().trim().optional(),
});

export { ZPost, postContentMaxLength };
