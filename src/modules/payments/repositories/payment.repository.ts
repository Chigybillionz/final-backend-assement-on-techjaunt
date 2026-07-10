import { AppDataSource } from "../../../database/datasource";
import { Payment } from "../../../entities/Payment.entity";

export class PaymentRepository {
  private readonly repository = AppDataSource.getRepository(Payment);

  async create(data: Partial<Payment>): Promise<Payment> {
    const payment = this.repository.create(data);

    return this.repository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.repository.find({
      relations: {
        booking: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findById(id: string): Promise<Payment | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        booking: true,
      },
    });
  }

  async findByReference(reference: string): Promise<Payment | null> {
    return this.repository.findOne({
      where: {
        reference,
      },
      relations: {
        booking: true,
      },
    });
  }

  async update(id: string, data: Partial<Payment>): Promise<Payment | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }
}
