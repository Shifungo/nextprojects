import { BankAccount, PIXPayment, TransferPayment } from "@prisma/client";
import { prisma } from "../../prismaClient";
import { NextResponse } from "next/server";

interface BankAccountRequest {
  bankName: string;
}

export async function POST(request: Request) {
  await prisma.$connect();

  const { bankName }: BankAccountRequest = await request.json();

  try {
    const bankAccount: BankAccount = await prisma.bankAccount.create({
      data: {
        bank_name: bankName,
      },
    });

    await prisma.pIXPayment.create({
      data: {
        bank_account_number: {
          connect: { id: bankAccount.id },
        },
      },
    });

    await prisma.transferPayment.create({
      data: {
        bank_account_number: {
          connect: { id: bankAccount.id },
        },
      },
    });

    return NextResponse.json({
      message: "Bank account created successfully",
    });
  } catch (error) {
    console.error("Error creating bank account:", error);
  } finally {
    await prisma.$disconnect();
  }
}
