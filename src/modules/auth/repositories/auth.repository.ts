import { AppDataSource } from "../../../database/datasource";
import { User } from "../../../entities/User.entity";

export class AuthRepository {
  private readonly repository = AppDataSource.getRepository(User);

  /**
   * Find User By Email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  /**
   * Find User By ID
   */
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  /**
   * Create User
   */
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);

    return this.repository.save(newUser);
  }

  /**
   * Save User
   */
  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  /**
   * Clear Refresh Token
   */
  async clearRefreshToken(id: string): Promise<void> {
    await this.repository.update(id, {
      refreshToken: null,
    });
  }
}
