import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "catsanddogs123";

const user = {
  id: 123,
  name: "peter",
  email: "randomemail@test.com",
  password: 123123123,
};

export const generateToken = (user: unknown): string => {
  // Generate a token with the user properties and a 1-hour expiration time
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
