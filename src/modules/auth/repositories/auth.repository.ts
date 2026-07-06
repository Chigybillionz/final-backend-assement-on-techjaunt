import { AppDataSource } from "../../../database/datasource";
import { User } from "../../../entities/User.entity";

export class AuthRepository {
  private readonly repository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);

    return this.repository.save(newUser);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
