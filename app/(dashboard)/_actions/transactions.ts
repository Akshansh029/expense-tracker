"use server";

import { CreateCategorySchemaType } from "@/schema/categories";
import { CreateTransactionSchema } from "@/schema/transaction";

export async function CreateTransaction(form: CreateCategorySchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
}
