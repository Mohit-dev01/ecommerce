import { AppError } from "../../common/errors/app-error";
import { comparePassword, hashPassword } from "../../utils/password";
import { signAccessToken } from "../../utils/jwt";
import { authRepository } from "./auth.repository";
import { LoginInput, RegisterInput } from "./auth.schema";

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await authRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new AppError("Email is already registered", 409);
    }

    const passwordHash = await hashPassword(input.password);

    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    const token = signAccessToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  },

  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signAccessToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  },

  async getCurrentUser(userId: string) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  },
};
