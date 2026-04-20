import { MigrationInterface, QueryRunner } from "typeorm";

export class FullSchema1776710307693 implements MigrationInterface {
    name = 'FullSchema1776710307693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificates" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "fileUrl" character varying NOT NULL, "issueDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4c7e31e2144300bea7d89eb165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "userId" integer, "guestId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" SERIAL NOT NULL, "cartId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "authorName" character varying NOT NULL, "contact" character varying, "text" text NOT NULL, "answer" text, "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, "userId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, "priceAtTime" numeric(10,2) NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'new', "totalAmount" numeric(10,2) NOT NULL, "paymentMethod" character varying NOT NULL, "deliveryMethod" character varying NOT NULL, "deliveryAddress" text, "deliveryPrice" double precision, "trackingNumber" character varying, "comment" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "message" text NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "read" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "type" character varying NOT NULL, "announce" text, "content" text, "imageUrl" character varying, "publishedAt" date NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "tags" text, "sortOrder" integer NOT NULL DEFAULT '0', "authorId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "imageUrl" character varying, "gallery" text, "sortOrder" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_02cf0d0f46e11d22d952f623670" UNIQUE ("slug"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "imageUrl" character varying, "videoUrl" character varying, "specifications" json, "sortOrder" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b0817c674bb984650c5274e713" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_certificates" ("productsId" integer NOT NULL, "certificatesId" integer NOT NULL, CONSTRAINT "PK_281b653b50c266910eb8b7b0c6c" PRIMARY KEY ("productsId", "certificatesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_65e273348e1509ab29e194d405" ON "product_certificates" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c593cba2426b70902f31c18afa" ON "product_certificates" ("certificatesId") `);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_edd714311619a5ad09525045838" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_72679d98b31c737937b8932ebe6" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_808b72e2dd559babee1678c49c1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_bc2370231ea3e3d296963f33939" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_43d968962b9e24e1e3517c0fbff" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_certificates" ADD CONSTRAINT "FK_65e273348e1509ab29e194d405e" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_certificates" ADD CONSTRAINT "FK_c593cba2426b70902f31c18afaa" FOREIGN KEY ("certificatesId") REFERENCES "certificates"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_certificates" DROP CONSTRAINT "FK_c593cba2426b70902f31c18afaa"`);
        await queryRunner.query(`ALTER TABLE "product_certificates" DROP CONSTRAINT "FK_65e273348e1509ab29e194d405e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_43d968962b9e24e1e3517c0fbff"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_bc2370231ea3e3d296963f33939"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_808b72e2dd559babee1678c49c1"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_72679d98b31c737937b8932ebe6"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_edd714311619a5ad09525045838"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c593cba2426b70902f31c18afa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65e273348e1509ab29e194d405"`);
        await queryRunner.query(`DROP TABLE "product_certificates"`);
        await queryRunner.query(`DROP TABLE "machines"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "chat_messages"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "certificates"`);
    }

}
