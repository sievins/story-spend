import "client-only";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function EditDelete({
  itemId,
  editSlug,
  deleteItemAction, // Should always be a serializable server action
}: {
  itemId: number;
  editSlug: string;
  deleteItemAction: (id: number) => Promise<void>;
}) {
  const fallbackRender = ({ error }: FallbackProps) => (
    <DeleteForm
      itemId={itemId}
      deleteItemAction={deleteItemAction}
      error={error}
    />
  );

  return (
    <div className="flex justify-end gap-2">
      {/* h-8 to get icon buttons to vertically align */}
      <button className="btn btn-ghost btn-xs align-middle h-8">
        <Link href={`/${editSlug}/${itemId}/edit`}>
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
      </button>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <DeleteForm itemId={itemId} deleteItemAction={deleteItemAction} />
      </ErrorBoundary>
    </div>
  );
}

function DeleteForm({
  itemId,
  deleteItemAction,
  error,
}: {
  itemId: number;
  deleteItemAction: (id: number) => Promise<void>;
  error?: string;
}) {
  const deleteItemWithId = deleteItemAction.bind(null, itemId);
  const [_state, dispatch] = useFormState(deleteItemWithId, null);
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
