"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth as authNext, signOut as signOutNext } from "@/auth";
import { transactionSchema } from "@/schemas";
import prisma from "@/db";

async function isSignedIn() {
  const auth = await authNext();
  return !!auth?.user;
}

export async function signOut() {
  await signOutNext();
}

async function fetchUser() {
  try {
    const auth = await authNext();
    const user = auth?.user;

    if (!user) throw new Error("User not found.");

    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createTransaction(_prevState: any, formData: FormData) {
  if (!isSignedIn()) {
    throw new Error("You must be signed in to create a transaction.");
  }

  const validatedFields = transactionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return validatedFields.error.flatten().fieldErrors;
  }

  try {
    const user = await fetchUser();

    await prisma.transaction.create({
      data: {
        ...validatedFields.data,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create transaction.");
  }

  revalidatePath("/transactions");
  redirect("/transactions");
}

export async function deleteTransaction(id: number) {
  if (!isSignedIn()) {
    throw new Error("You must be signed in to delete a transaction.");
  }

  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete transaction.");
  }

  revalidatePath("/transactions");
}
