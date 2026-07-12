import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1783880355723 implements MigrationInterface {
    name = 'CreateReviewTable1783880355723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rating" integer NOT NULL, "comment" text NOT NULL, "customerId" uuid, "vehicleId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'success', 'failed', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "gateway"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_gateway_enum" AS ENUM('paystack')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "gateway" "public"."payments_gateway_enum" NOT NULL DEFAULT 'paystack'`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentstatus_enum" AS ENUM('pending', 'success', 'failed', 'refunded')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentStatus" "public"."bookings_paymentstatus_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_6d99bdfa69280ede313699fab92" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_71782ee6bd6449d100b221357cd" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_71782ee6bd6449d100b221357cd"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_6d99bdfa69280ede313699fab92"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "gateway"`);
        await queryRunner.query(`DROP TYPE "public"."payments_gateway_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "gateway" character varying NOT NULL DEFAULT 'paystack'`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
