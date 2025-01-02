"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth as authNext, signOut as signOutNext } from "@/auth";
import { transactionSchema, bookSchema } from "@/schemas";
import prisma from "@/db";

export async function isSignedIn() {
  const auth = await authNext();
  return !!auth?.user;
}

export async function signOut() {
  await signOutNext();
}

export async function fetchUser() {
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

export async function upsertTransaction(
  id: number | undefined,
  _prevState: any,
  formData: FormData,
) {
  const createEditString = id ? "edit" : "create";

  if (!isSignedIn()) {
    throw new Error(
      `You must be signed in to ${createEditString} a transaction.`,
    );
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

    await prisma.transaction.upsert({
      where: {
        id: id || -1, // upsert doesn't suppport undefined: https://github.com/prisma/prisma-client-js/issues/781
        userId: user.id,
      },
      update: {
        ...validatedFields.data,
        userId: user.id,
      },
      create: {
        ...validatedFields.data,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to ${createEditString} transaction.`);
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

async function upsertBook(formData: FormData, id?: number) {
  const createEditString = id ? "edit" : "create";

  if (!isSignedIn()) {
    throw new Error(`You must be signed in to ${createEditString} a book.`);
  }

  const validatedFields = bookSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return validatedFields.error.flatten().fieldErrors;
  }

  try {
    const user = await fetchUser();

    await prisma.book.upsert({
      where: {
        id: id || -1, // upsert doesn't suppport undefined: https://github.com/prisma/prisma-client-js/issues/781
        userId: user.id,
      },
      update: {
        ...validatedFields.data,
        userId: user.id,
      },
      create: {
        ...validatedFields.data,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to ${createEditString} book.`);
  }
}

export async function createBook(_prevState: any, formData: FormData) {
  upsertBook(formData);

  // Books can be created from the /transactions/create or edit page via a model.
  revalidatePath("/transactions/create");
  revalidatePath("/transactions/[slug]/edit");
}

export async function upsertBookAndRedirect(
  id: number | undefined,
  _prevState: any,
  formData: FormData,
) {
  await upsertBook(formData, id);
  redirect("/books");
}

export async function deleteBook(id: number) {
  if (!isSignedIn()) {
    throw new Error("You must be signed in to delete a book.");
  }

  try {
    await prisma.book.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete book.");
  }

  revalidatePath("/books");
}
