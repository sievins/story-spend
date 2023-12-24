"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut as signOutAuth } from "@/auth";
import { transactionSchema } from "@/schemas";
import prisma from "@/db";

export async function signOut() {
  await signOutAuth();
}

export async function createTransaction(_prevState: any, formData: FormData) {
  const validatedFields = transactionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return validatedFields.error.flatten().fieldErrors;
  }

  try {
    await prisma.transaction.create({
      data: validatedFields.data,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create transaction.");
  }

  revalidatePath("/transactions");
  redirect("/transactions");
}
