"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleOutlineIcon } from "@heroicons/react/24/outline";
import { createTransaction } from "@/actions";
import type { Book } from "@prisma/client";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      className="btn btn-primary"
      value="Create my transaction"
      disabled={pending}
    />
  );
}

export default function Form({ books }: { books: Book[] }) {
  const [BookCheckIcon, setBookCheckIcon] = useState<
    typeof CheckCircleOutlineIcon
  >(CheckCircleOutlineIcon);

  const [_state, dispatch] = useFormState(createTransaction, null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={dispatch}>
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
            />
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
              className="input input-bordered w-full"
              min="0.01"
              step="0.01"
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
              defaultValue={today}
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
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Book (optional)</span>
            </div>
            <select
              id="book"
              name="bookId"
              className="select select-bordered w-full"
              defaultValue="No book selected"
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
                  {book.title}
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

      <Submit />
    </form>
  );
}
