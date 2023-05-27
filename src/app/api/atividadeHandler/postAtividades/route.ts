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
  card_id?: number;
  pix_id?: number;
  transfer_id?: number;
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

  if (payment_method === "CASH") {
    const activity: Activity = await prisma.activity.create({
      data: {
        date,
        type,
        start_time,
        end_time,
        payment_method,
        moneyChange,
        description,
        month,
      },
    });
  }
  if (payment_method === "CARD") {
    const activity: Activity = await prisma.activity.create({
      data: {
        date,
        type,
        start_time,
        end_time: start_time,
        payment_method,
        moneyChange,
        description,
        month,
        card_id: 1,
      },
    });
  }
  if (payment_method === "PIX") {
    const activity: Activity = await prisma.activity.create({
      data: {
        date,
        type,
        start_time,
        end_time,
        payment_method,
        moneyChange,
        description,
        month,
      },
    });
  }
  if (payment_method === "TRANSFER") {
    const activity: Activity = await prisma.activity.create({
      data: {
        date,
        type,
        start_time,
        end_time,
        payment_method,
        moneyChange,
        description,
        month,
      },
    });
  }

  prisma.$disconnect();
  return NextResponse.json({
    message: `Atividade adicionada.`,
  });
}
