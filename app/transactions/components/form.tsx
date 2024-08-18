"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleOutlineIcon } from "@heroicons/react/24/outline";
import { upsertTransaction } from "@/actions";
import { transactionSchema, type TransactionSchema } from "@/schemas";
import type { Book, Transaction } from "@prisma/client";
import clsx from "clsx";
import CreateBook, {
  createBookId,
} from "@/app/transactions/components/create-book";
import domPurify from "@/lib/dom-purify";

function Submit({
  disabled,
  isEditing,
}: {
  disabled: boolean;
  isEditing: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      className="btn btn-primary"
      value={`${isEditing ? "Edit" : "Create"} my transaction`}
      disabled={disabled || pending}
    />
  );
}

export default function Form({
  books,
  transaction,
}: {
  books: Book[];
  transaction?: Transaction;
}) {
  const upsertTransactionWithId = upsertTransaction.bind(null, transaction?.id);
  // No need to use _state (containing the errors from server actions): can only submit the transaction if the form is valid.
  const [_state, dispatch] = useFormState(upsertTransactionWithId, null);
  const formRef = useRef<HTMLFormElement>(null);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [errors, setErrors] = useState<
    Record<keyof TransactionSchema, string[]>
  >({
    title: [],
    amount: [],
    date: [],
    bookId: [],
  });

  const [BookCheckIcon, setBookCheckIcon] = useState<
    typeof CheckCircleOutlineIcon
  >(CheckCircleOutlineIcon);

  // Disbable the submit button if the form is invalid.
  const handleChange = () => {
    const form = formRef.current;
    if (form) {
      const isValid = form.checkValidity();
      setSubmitDisabled(!isValid);
    }
  };

  // Validate the field on blur.
  const handleBlur = (field: keyof TransactionSchema) => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);

      const validatedFields = transactionSchema.safeParse(
        Object.fromEntries(formData.entries()),
      );

      if (!validatedFields.success) {
        const { fieldErrors } = validatedFields.error.flatten();
        setErrors((errors) => ({
          ...errors,
          [field]: fieldErrors[field] ?? [],
        }));
      } else {
        setErrors({
          title: [],
          amount: [],
          date: [],
          bookId: [],
        });
      }
    }
  };

  const dateToString = (date: Date) => date.toISOString().split("T")[0];
  const today = dateToString(new Date());

  return (
    <>
      <form action={dispatch} ref={formRef} onChange={handleChange}>
        <div className="flex flex-col gap-y-2">
          {/* Title field */}
          <div className="flex">
            <label className="peer form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                id="title"
                name="title"
                type="text"
                className="input input-bordered w-full"
                maxLength={100}
                required
                onBlur={() => handleBlur("title")}
                defaultValue={transaction?.title}
              />
              <div
                className={clsx("label hidden", {
                  "!flex": errors.title.length,
                })}
              >
                <span
                  className={clsx("label-text-alt flex flex-col", {
                    "text-error": errors.title.length,
                  })}
                >
                  {errors.title.map((error) => (
                    <span key={error}>{error}</span>
                  ))}
                </span>
              </div>
            </label>
            <div className="hidden peer-has-[:valid]:flex flex-col">
              <div className="h-9" />
              <div className="flex items-center h-12 ml-2">
                <CheckCircleIcon className="w-10 h-10 text-success" />
              </div>
            </div>
          </div>

          {/* Amount field */}
          <div className="flex">
            <label className="peer form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Amount</span>
              </div>
              <input
                id="amount"
                name="amount"
                type="number"
                className={clsx("input input-bordered w-full", {
                  "input-error": errors.amount.length,
                })}
                min="0.01"
                step="0.01"
                required
                onBlur={() => handleBlur("amount")}
                defaultValue={
                  transaction ? transaction.amount / 100 : undefined
                }
              />
              <div
                className={clsx("label hidden", {
                  "!flex": errors.amount.length,
                })}
              >
                <span
                  className={clsx("label-text-alt flex flex-col", {
                    "text-error": errors.amount.length,
                  })}
                >
                  {errors.amount.map((error) => (
                    <span key={error}>{error}</span>
                  ))}
                </span>
              </div>
            </label>
            <div className="hidden peer-has-[:valid]:flex flex-col">
              <div className="h-9" />
              <div className="flex items-center h-12 ml-2">
                <CheckCircleIcon className="w-10 h-10 text-success" />
              </div>
            </div>
          </div>

          {/* Date field */}
          <div className="flex">
            <label className="peer form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <input
                id="date"
                name="date"
                type="date"
                className="input input-bordered w-full"
                defaultValue={
                  transaction ? dateToString(transaction.date) : today
                }
                required
              />
            </label>
            <div className="hidden peer-has-[:valid]:flex flex-col">
              <div className="h-9" />
              <div className="flex items-center h-12 ml-2">
                <CheckCircleIcon className="w-10 h-10 text-success" />
              </div>
            </div>
          </div>

          {/* Receipt field */}
          {/* <div className="flex"> */}
          {/*   <label className="peer form-control w-full max-w-sm"> */}
          {/*     <div className="label"> */}
          {/*       <span className="label-text">Receipt (optional)</span> */}
          {/*     </div> */}
          {/*     <input */}
          {/*       id="receipt" */}
          {/*       name="receipt" */}
          {/*       type="file" */}
          {/*       className="file-input file-input-bordered w-full text-sm" */}
          {/*     /> */}
          {/*   </label> */}
          {/*   <div className="hidden peer-has-[:valid]:flex flex-col"> */}
          {/*     <div className="h-9" /> */}
          {/*     <div className="flex items-center h-12 ml-2"> */}
          {/*       <CheckCircleOutlineIcon className="w-10 h-10 text-success" /> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}

          {/* Book field */}
          <div className="flex">
            <label className="peer form-control w-full max-w-sm" htmlFor="book">
              <div className="label justify-start gap-x-2">
                <span className="label-text">Book (optional)</span>
                <div className="tooltip h-5" data-tip="Create book">
                  {/* CreateBook dialog component used below, after the form element */}
                  <button
                    className="btn btn-ghost h-5 min-h-0 px-0.5"
                    type="button"
                    onClick={() =>
                      (
                        document.getElementById(
                          createBookId,
                        ) as HTMLDialogElement
                      )?.showModal()
                    }
                  >
                    <PlusCircleIcon className="w-[18px] h-[18px] fill-primary" />
                  </button>
                </div>
              </div>
              <select
                id="book"
                name="bookId"
                className="select select-bordered w-full"
                defaultValue={
                  transaction?.bookId ? transaction.bookId : "No book selected"
                }
                onChange={(e) => {
                  const bookId = e.target.value;
                  if (bookId) {
                    setBookCheckIcon(CheckCircleIcon);
                  } else {
                    setBookCheckIcon(CheckCircleOutlineIcon);
                  }
                }}
              >
                <option value="">No book selected</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {domPurify(book.title)}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden peer-has-[:valid]:flex flex-col">
              <div className="h-9" />
              <div className="flex items-center h-12 ml-2">
                <BookCheckIcon className="w-10 h-10 text-success" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-6" />

        <Submit disabled={submitDisabled} isEditing={!!transaction?.id} />
      </form>
      {/* CreateBook dialog must be outside of form element, as it contains its own form */}
      <CreateBook />
    </>
  );
}
