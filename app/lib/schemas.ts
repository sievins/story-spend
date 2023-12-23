import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string({
      required_error: "A title is required",
      invalid_type_error: "The title must be a string",
    })
    .min(1, "A title is required")
    .max(100, "The title must be 100 or fewer characters long"),
  // https://github.com/colinhacks/zod/issues/2677
  // zod.preprocess (v3.22) issues are ignored in case of another error in the model
  // using .transform().pipe() instead
  amount: z
    .string()
    .transform((value) => (value === "" ? undefined : Number(value)))
    .pipe(
      z
        .number({
          required_error: "An amount is required",
          invalid_type_error: "The amount must be a number",
        })
        .positive("The amount must be positive")
        .multipleOf(0.01, "The amount must be a multiple of 0.01"),
    ),
  date: z.coerce.date({
    required_error: "A date is required",
    invalid_type_error: "The date must be an actual date",
  }),
  bookId: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().optional(),
  ),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
