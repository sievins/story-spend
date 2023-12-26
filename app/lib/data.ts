import { unstable_noStore as noStore } from "next/cache";
import { auth as authNext } from "@/auth";
import prisma from "@/db";

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

async function fetchUser() {
  try {
    const auth = await authNext();
    const user = auth?.user;

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTransactionsPages() {
  noStore();

  try {
    const user = await fetchUser();

    const count = await prisma.transaction.count({
      where: {
        userId: user.id,
      },
    });

    return Math.ceil(count / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions pages.");
  }
}

export async function fetchTransactions(page: number) {
  noStore();

  try {
    const user = await fetchUser();

    const transactions = await prisma.transaction.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        book: true,
      },
      orderBy: {
        date: "desc",
      },
      where: {
        userId: user.id,
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

export async function fetchBooks() {
  noStore();

  try {
    const user = await fetchUser();

    const books = await prisma.book.findMany({
      where: {
        userId: user.id,
      },
    });

    return books;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch books.");
  }
}
