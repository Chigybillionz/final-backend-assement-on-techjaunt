import bcrypt from "bcrypt";

import { AuthRepository } from "../repositories/auth.repository";

import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";

import { ConflictError } from "../../../utils/errors/ConflictError";
import { UnauthorizedError } from "../../../utils/errors/UnauthorizedError";

import { UserResponse } from "../responses/user.response";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";

import { generateRandomToken, hashToken } from "../../../utils/tokens";

export class AuthService {
  private readonly authRepository = new AuthRepository();

  /**
   * Register User
   */
  async register(data: RegisterUserDto): Promise<UserResponse> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Generate email verification token
    const verificationToken = generateRandomToken();

    // Store only the hashed token
    const hashedVerificationToken = hashToken(verificationToken);

    const user = await this.authRepository.create({
      ...data,
      password: hashedPassword,
      emailVerificationToken: hashedVerificationToken,
      isEmailVerified: false,
    });

    /**
     * TODO:
     * Send verification email.
     * For now we'll log the token until
     * we integrate Nodemailer.
     */
    console.log("=================================");
    console.log("EMAIL VERIFICATION TOKEN");
    console.log(verificationToken);
    console.log("=================================");

    return new UserResponse(user);
  }

  /**
   * Login User
   */
  async login(data: LoginUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }> {
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

    // Hash refresh token before storing
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    user.refreshToken = hashedRefreshToken;

    await this.authRepository.save(user);

    return {
      accessToken,
      refreshToken,
      user: new UserResponse(user),
    };
  }

  /**
   * Refresh Access Token
   */
  async refresh(data: RefreshTokenDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = verifyRefreshToken(data.refreshToken);

    const user = await this.authRepository.findById(payload.id);

    if (!user) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    if (!user.refreshToken) {
      throw new UnauthorizedError("Refresh token not found");
    }

    const isMatch = await bcrypt.compare(data.refreshToken, user.refreshToken);

    if (!isMatch) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const newPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(newPayload);
    const refreshToken = generateRefreshToken(newPayload);

    // Rotate refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    user.refreshToken = hashedRefreshToken;

    await this.authRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Logout User
   */
  async logout(userId: string): Promise<void> {
    await this.authRepository.clearRefreshToken(userId);
  }
}
