"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { createBookAndRedirect } from "@/actions";
import { bookSchema, type BookSchema } from "@/schemas";
import clsx from "clsx";

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

export default function Form() {
  // No need to use _state (containing the errors from server actions): can only submit the book if the form is valid.
  const [_state, dispatch] = useFormState(createBookAndRedirect, null);
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
  const handleBlur = (field: keyof BookSchema) => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);

      const validatedFields = bookSchema.safeParse(
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
              onBlur={() => handleBlur("title")}
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
  );
}
