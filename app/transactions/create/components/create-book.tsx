"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { createBook } from "@/actions";
import { bookSchema, type BookSchema } from "@/schemas";
import { ErrorWithRetry } from "@/components/error";

export const createBookId = "create-book";

export default function CreateBook() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog id={createBookId} className="modal" ref={dialogRef}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </form>
        <h3 className="font-bold text-lg">Create book</h3>
        <ErrorWithRetry>
          <Form onSuccessfulSubmit={closeDialog} />
        </ErrorWithRetry>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function Form({ onSuccessfulSubmit }: { onSuccessfulSubmit: () => void }) {
  // No need to use _state (containing the errors from server actions): can only submit the transaction if the form is valid.
  const [_state, dispatch] = useFormState(createBook, null);
  const formRef = useRef<HTMLFormElement>(null);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [errors, setErrors] = useState<Record<keyof BookSchema, string[]>>({
    title: [],
  });

  // Disbable the submit button if the form is invalid.
  const handleChange = () => {
    const form = formRef.current;
    if (form) {
      const isValid = form.checkValidity();
      setSubmitDisabled(!isValid);
    }
  };

  // Validate the field on blur.
  const handleBlur = () => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);

      const validatedFields = bookSchema.safeParse(
        Object.fromEntries(formData.entries()),
      );

      if (!validatedFields.success) {
        const { fieldErrors } = validatedFields.error.flatten();
        setErrors({
          title: fieldErrors.title ?? [],
        });
      } else {
        setErrors({
          title: [],
        });
      }
    }
  };

  return (
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
              onBlur={handleBlur}
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
      </div>

      <div className="h-6" />

      <Submit
        disabled={submitDisabled}
        onSuccessfulSubmit={onSuccessfulSubmit}
      />
    </form>
  );
}

function Submit({
  disabled,
  onSuccessfulSubmit,
}: {
  disabled: boolean;
  onSuccessfulSubmit: () => void;
}) {
  const { pending } = useFormStatus();

  // Invoke onSuccessfulSubmit when the pending becomes false after being true.
  // Note that when there is an error, pending remains true, so the error boundry is displayed in the dialog.
  const prevPendingRef = useRef(pending);
  useEffect(() => {
    if (prevPendingRef.current && !pending) {
      onSuccessfulSubmit();
    }
    prevPendingRef.current = pending;
  }, [pending, onSuccessfulSubmit]);

  return (
    <input
      type="submit"
      className="btn btn-primary"
      value="Create my book"
      disabled={disabled || pending}
    />
  );
}
