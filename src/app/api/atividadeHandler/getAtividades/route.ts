import { PrismaClient, Activity } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const monthDate = searchParams.get("month");
  try {
    let result: Activity[] | null = null;
    date && monthDate
      ? (result = await prisma.activity.findMany({
          where: { date: date, month: monthDate },
        }))
      : (result = await prisma.activity.findMany({
          where: { date: "1" },
        }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching activities:", error);
    NextResponse.error();
  }
}
