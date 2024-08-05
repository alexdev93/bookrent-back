const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
  password: z.string().min(3, "Password must be at least 6 characters long"),
  location: z.string().min(2, "location must have above two charachters"),
  role: z.enum(["admin", "owner", "renter"]),
});

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
