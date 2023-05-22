import { BankAccount } from "@prisma/client";
import { prisma } from "../../prismaClient";
import { NextResponse } from "next/server";

interface BankAccountRequest {
  bankName: string;
}

export async function POST(request: Request) {
  await prisma.$connect();

  const { bankName }: BankAccountRequest = await request.json();

  console.log(bankName);

  const bankAccount: BankAccount = await prisma.bankAccount.create({
    data: {
      bank_name: bankName,
    },
  });

  prisma.$disconnect();

  return NextResponse.json({
    message: `Conta ${bankAccount.bank_name} adicionada.`,
  });
}

export async function GET() {
  await prisma.$connect();

  const bankAccounts: BankAccount[] = await prisma.bankAccount.findMany();

  prisma.$disconnect();
  console.log(bankAccounts);
  return NextResponse.json(bankAccounts);
}
