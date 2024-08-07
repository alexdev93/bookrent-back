const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 6 characters long"),
  location: z
    .string()
    .min(2, "location must have above two charachters")
    .optional(),
  role: z.enum(["admin", "owner", "renter"]),
});

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  isApproved: z.boolean().optional(),
});

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "owner", "renter"], "Invalid role"),
  status: z.enum(["active", "disabled"], "Invalid status"),
  isApproved: z.boolean(),
});

module.exports = {
  registerSchema,
  loginSchema,
  bookSchema,
  userSchema,
};
