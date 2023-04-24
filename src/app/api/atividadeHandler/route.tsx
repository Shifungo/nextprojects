import { PrismaClient, Activity } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

interface ActivityRequest {
  type: string;
  start_time: string;
  end_time: string;
  moneyChange: string;
  description: string;
}

export async function POST(request: Request, { params }: { params: string }) {
  await prisma.$connect();
  const {
    type,
    start_time,
    end_time,
    moneyChange,
    description,
  }: ActivityRequest = await request.json();

  const activity: Activity = await prisma.activity.create({
    data: {
      type,
      start_time,
      end_time,
      moneyChange,
      description,
    },
  });

  return NextResponse.json({
    message: `Atividade ${activity.type} adicionada.`,
  });
}

export async function GET(request: Request, { params }: { params: string }) {
  try {
    const atividades = await prisma.activity.findMany();
    console.log("Atividades:", atividades);
    return NextResponse.json(atividades);
  } catch (error) {
    console.error("Error fetching activities:", error);
    NextResponse.error();
  }
}
