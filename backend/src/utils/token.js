import jwt from "jsonwebtoken";

export const generateJWToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  const id = user.id || user._id;

  if (!id) {
    throw new Error("Cannot generate token without user id");
  }

  return jwt.sign(
    { id: id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
