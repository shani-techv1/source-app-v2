-- CreateTable
CREATE TABLE "public"."RoleField" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "field_label" TEXT NOT NULL,
    "field_type" TEXT NOT NULL,
    "field_options" JSONB,
    "field_placeholder" TEXT,
    "is_multiple" BOOLEAN NOT NULL DEFAULT false,
    "allowed_file_types" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "RoleField_pkey" PRIMARY KEY ("id")
);
