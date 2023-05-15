import { NextResponse } from "next/server";
import { prisma } from "../../../prismaClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const monthDate = searchParams.get("month");

  try {
    let result: object | null = null;

    date && monthDate
      ? (result = await prisma.activity.findMany({
          where: { date: date, month: monthDate },
          select: {
            id: true,
            type: true,
          },
        }))
      : (result = await prisma.activity.findMany({
          where: { date: "1" },
        }));

    console.log("result", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching activities:", error);
    NextResponse.error();
  }
}
