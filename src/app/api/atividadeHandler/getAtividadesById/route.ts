import { Activity } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "../../../prismaClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    let result: Activity[] | null = null;
    if (id == typeof NaN) {
      return NextResponse.json("id is not a number");
    }
    id
      ? (result = await prisma.activity.findMany({
          where: { id: Number(id) },
        }))
      : (result = null);

    console.log("result", result, "id", id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching activities:", error);
    NextResponse.error();
  }
}
