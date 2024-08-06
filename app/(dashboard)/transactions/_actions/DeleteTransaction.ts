"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
  const user = await currentUser();
  if (!user) {
    console.error("User not found, redirecting to sign-in.");
    redirect("/sign-in");
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  if (!transaction || transaction.userId !== user.id) {
    console.error("Transaction not found or unauthorized access.");
    throw new Error("Transaction not found or unauthorized access.");
  }

  const day = transaction.date.getUTCDate();
  const month = transaction.date.getUTCMonth() + 1;
  const year = transaction.date.getUTCFullYear();

  const incomeChange = transaction.type === "income" ? -transaction.amount : 0;
  const expensesChange =
    transaction.type === "expense" ? -transaction.amount : 0;

  try {
    await prisma.$transaction([
      prisma.transaction.delete({
        where: {
          id,
        },
      }),

      prisma.monthHistory.upsert({
        where: {
          day_month_year_userId: {
            userId: user.id,
            day,
            month,
            year,
          },
        },
        update: {
          income: {
            increment: incomeChange,
          },
          expenses: {
            increment: expensesChange,
          },
        },
        create: {
          userId: user.id,
          day,
          month,
          year,
          income: incomeChange,
          expenses: expensesChange,
        },
      }),

      prisma.yearHistory.upsert({
        where: {
          month_year_userId: {
            userId: user.id,
            month,
            year,
          },
        },
        update: {
          income: {
            increment: incomeChange,
          },
          expenses: {
            increment: expensesChange,
          },
        },
        create: {
          userId: user.id,
          month,
          year,
          income: incomeChange,
          expenses: expensesChange,
        },
      }),
    ]);
  } catch (error) {
    throw new Error("Failed to delete transaction.");
  }
}
