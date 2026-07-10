import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentsTable1783670661182 implements MigrationInterface {
    name = 'CreatePaymentsTable1783670661182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reference" character varying NOT NULL, "amount" numeric NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "gateway" character varying NOT NULL DEFAULT 'paystack', "paidAt" TIMESTAMP, "bookingId" uuid, CONSTRAINT "UQ_866ddee0e17d9385b4e3b86851d" UNIQUE ("reference"), CONSTRAINT "REL_1ead3dc5d71db0ea822706e389" UNIQUE ("bookingId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_1ead3dc5d71db0ea822706e389d" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_1ead3dc5d71db0ea822706e389d"`);
        await queryRunner.query(`DROP TABLE "payments"`);
    }

}
