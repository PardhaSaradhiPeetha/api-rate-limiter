import jwt from "jsonwebtoken";

export const generateJWToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.NODE_ENV.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
