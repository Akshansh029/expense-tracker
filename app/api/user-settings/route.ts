import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return redirect("/sign-in");
    }

    let userSettings = await prisma.userSettings.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!userSettings) {
      userSettings = await prisma.userSettings.create({
        data: {
          userId: user.id,
          currency: "INR",
        },
      });
    }

    revalidatePath("/");

    return NextResponse.json(userSettings, { status: 200 });
  } catch (error) {
    console.error("Error fetching or creating user settings:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
