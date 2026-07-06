import bcrypt from "bcrypt";

import { AuthRepository } from "../repositories/auth.repository";
import { RegisterUserDto } from "../dto/register-user.dto";
import { User } from "../../../entities/User.entity";

export class AuthService {
  private readonly authRepository = new AuthRepository();

  async register(data: RegisterUserDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}
