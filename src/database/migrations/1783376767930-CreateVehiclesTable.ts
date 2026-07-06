import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehiclesTable1783376767930 implements MigrationInterface {
    name = 'CreateVehiclesTable1783376767930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "color" character varying NOT NULL, "transmission" character varying NOT NULL, "fuelType" character varying NOT NULL, "pricePerDay" numeric NOT NULL, "available" boolean NOT NULL DEFAULT true, "image" character varying, "ownerId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
