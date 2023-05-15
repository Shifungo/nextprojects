import { CARDPayment } from "@prisma/client";
import { prisma } from "../../prismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await prisma.$connect();

  const {
    card_number,
    card_name,
    card_close_day,
    card_due_day,
    card_limit,
    bank_account_id,
  }: CARDPayment = await request.json();

  const cardName: CARDPayment = await prisma.cARDPayment.create({
    data: {
      card_number,
      card_name,
      card_close_day: +card_close_day,
      card_due_day: +card_due_day,
      card_limit,
      bank_account_id,
    },
  });
  console.log(cardName);

  prisma.$disconnect();

  return NextResponse.json({
    message: `cartao ${cardName.card_name} adicionada.`,
  });
}
