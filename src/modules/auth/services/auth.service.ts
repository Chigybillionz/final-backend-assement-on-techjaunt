import bcrypt from "bcrypt";

import { AuthRepository } from "../repositories/auth.repository";

import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

import { User } from "../../../entities/User.entity";

import { ConflictError } from "../../../utils/errors/ConflictError";
import { UnauthorizedError } from "../../../utils/errors/UnauthorizedError";

import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";

export class AuthService {
  private readonly authRepository = new AuthRepository();

  async register(data: RegisterUserDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;

    await this.authRepository.save(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }
}
