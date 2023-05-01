import { PrismaClient, Activity } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

interface ActivityRequest {
  date: string;
  type: string;
  start_time: string;
  end_time: string;
  moneyChange: string;
  description: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  try {
    let result: Activity[] | null = null;
    date
      ? (result = await prisma.activity.findMany({
          where: { date: date },
        }))
      : (result = await prisma.activity.findMany({
          where: { date: "1" },
        }));

    console.log("result ", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching activities:", error);
    NextResponse.error();
  }
}
