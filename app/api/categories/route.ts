"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    redirect("sign-in");
  }

  const { searchParams } = new URL(request.url);
  const paramType = searchParams.get("type");

  const validator = z.enum(["expense", "income"]).nullable();

  const queryParams = validator.safeParse(paramType);

  const type = queryParams.data;
  const categories = await prisma.category.findMany({
    where: {
        userId: user.id
        ...(type && { type }), //if type is defined, include it in the filters
    },
    orderBy: {
        name: "asc",
    }
  });

  return NextResponse.json(categories);
}
