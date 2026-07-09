import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookingsTable1783587207643 implements MigrationInterface {
    name = 'CreateBookingsTable1783587207643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pickupDate" date NOT NULL, "returnDate" date NOT NULL, "totalPrice" numeric NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "paymentStatus" character varying NOT NULL DEFAULT 'pending', "customerId" uuid, "vehicleId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_67b9cd20f987fc6dc70f7cd283f" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_30909e71d6dd969e95d995258f1" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_30909e71d6dd969e95d995258f1"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_67b9cd20f987fc6dc70f7cd283f"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
