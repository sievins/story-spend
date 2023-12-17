import { unstable_noStore as noStore } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB");
};

const pageSize = 10;

export async function fetchTransactionsPages() {
  noStore();

  try {
    const count = await prisma.transaction.count();

    return Math.ceil(count / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions pages.");
  }
}

export async function fetchTransactions(page: number) {
  noStore();

  try {
    const transactions = await prisma.transaction.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        book: true,
      },
    });

    return transactions.map((transaction) => ({
      ...transaction,
      amount: formatCurrency(transaction.amount),
      date: formatDate(transaction.date),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions.");
  }
}
