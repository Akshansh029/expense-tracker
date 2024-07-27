"use server";

import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("sign-in");
  }

  const { name, icon };
}
