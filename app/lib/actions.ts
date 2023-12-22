"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/db";

const transactionSchema = z.object({
  title: z
    .string({
      required_error: "A title is required",
      invalid_type_error: "The title must be a string",
    })
    .max(100, "The title must be 100 or fewer characters long"),
  amount: z.coerce
    .number({
      required_error: "An amount is required",
      invalid_type_error: "The amount must be a number",
    })
    .positive("The amount must be positive")
    .multipleOf(0.01, "The amount must be a multiple of 0.01"),
  date: z.coerce.date({
    required_error: "A date is required",
    invalid_type_error: "The date must be an actual date",
  }),
  bookId: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().optional(),
  ),
});

export async function createTransaction(_prevState: any, formData: FormData) {
  const validatedFields = transactionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error);
    return;
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
