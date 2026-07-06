import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1783339235980 implements MigrationInterface {
    name = 'CreateUsersTable1783339235980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'owner', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying NOT NULL, "phone" character varying(20), "profileImage" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', "isEmailVerified" boolean NOT NULL DEFAULT false, "isVerifiedOwner" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "provider" character varying, "providerId" character varying, "refreshToken" character varying, "emailVerificationToken" character varying, "passwordResetToken" character varying, "passwordResetExpires" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
