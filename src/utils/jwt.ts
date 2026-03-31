import jwt from "jsonwebtoken";
import { env } from "../config/env";

type JwtPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET!, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
}
``;

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
}
