"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteTransaction } from "@/actions";
import clsx from "clsx";

export default function Actions({ transactionId }: { transactionId: number }) {
  const fallbackRender = ({ error }: FallbackProps) => (
    <DeleteForm transactionId={transactionId} error={error} />
  );

  return (
    <div className="flex justify-end gap-2">
      {/* h-8 to get icon buttons to vertically align */}
      <button className="btn btn-ghost btn-xs align-middle h-8">
        <PencilSquareIcon className="h-5 w-5" />
      </button>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <DeleteForm transactionId={transactionId} />
      </ErrorBoundary>
    </div>
  );
}

function DeleteForm({
  transactionId,
  error,
}: {
  transactionId: number;
  error?: string;
}) {
  const deleteTransactionWithId = deleteTransaction.bind(null, transactionId);
  const [_state, dispatch] = useFormState(deleteTransactionWithId, null);
  return (
    <form action={dispatch}>
      <DeleteButton error={error} />
    </form>
  );
}

function DeleteButton({ error }: { error?: string }) {
  const { pending } = useFormStatus();
  return (
    <div
      className={clsx({
        "tooltip tooltip-open tooltip-error": !!error,
      })}
      data-tip={error}
    >
      <button
        className="btn btn-ghost btn-xs align-middle"
        type="submit"
        disabled={pending}
      >
        <TrashIcon
          className={clsx("h-5 w-5", {
            "fill-error": !!error,
          })}
        />
      </button>
    </div>
  );
}
