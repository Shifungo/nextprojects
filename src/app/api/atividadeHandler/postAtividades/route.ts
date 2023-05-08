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
  month: string;
}
export async function POST(request: Request, { params }: { params: string }) {
  await prisma.$connect();
  const {
    date,
    type,
    start_time,
    end_time,
    moneyChange,
    description,
    month,
  }: ActivityRequest = await request.json();

  const activity: Activity = await prisma.activity.create({
    data: {
      date,
      type,
      start_time,
      end_time,
      moneyChange,
      description,
      month,
    },
  });

  return NextResponse.json({
    message: `Atividade ${activity.type} adicionada.`,
  });
}
