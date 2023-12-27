"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { createBook } from "@/actions";
import { bookSchema, type BookSchema } from "@/schemas";

export const createBookId = "create-book";

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      className="btn btn-primary"
      value="Create my book"
      disabled={disabled || pending}
    />
  );
}

export default function CreateBook() {
  // No need to use _state (containing the errors from server actions): can only submit the transaction if the form is valid.
  const [_state, dispatch] = useFormState(createBook, null);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogFormRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = (action: FormData) => {
    dispatch(action);

    // Close dialog
    if (dialogFormRef.current) {
      dialogFormRef.current.submit();
    }
  };

  return (
    <dialog id={createBookId} className="modal">
      <div className="modal-box">
        <form method="dialog" ref={dialogFormRef}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </form>

        <h3 className="font-bold text-lg">Create book</h3>

        <form action={handleSubmit} ref={formRef} onChange={handleChange}>
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

          <Submit disabled={submitDisabled} />
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
