import { PrismaClient, Activity } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

interface ActivityRequest {
  type: string;
  start_time: string;
  end_time: string;
  money_change: string;
  description: string;
}

export async function POST(request: Request, { params }: { params: string }) {
  await prisma.$connect();
  const {
    type,
    start_time,
    end_time,
    money_change,
    description,
  }: ActivityRequest = await request.json();

  const activity: Activity = await prisma.activity.create({
    data: {
      type,
      start_time,
      end_time,
      money_change,
      description,
    },
  });

  return NextResponse.json({
    message: `Atividade ${activity.type} adicionada.`,
  });
}
