import { Activity, PaymentMethod } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "../../../prismaClient";

interface ActivityRequest {
  date: string;
  type: string;
  start_time: string;
  end_time: string;
  payment_method: PaymentMethod;
  moneyChange: string;
  description: string;
  month: string;
}
export async function POST(request: Request) {
  await prisma.$connect();

  const {
    date,
    type,
    start_time,
    end_time,
    payment_method,
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
      payment_method: "CASH",
      moneyChange,
      description,
      month,
    },
  });

  prisma.$disconnect();
  return NextResponse.json({
    message: `Atividade ${activity.type} adicionada.`,
  });
}
