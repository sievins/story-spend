"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deleteTransaction } from "@/actions";

export default function Actions({ transactionId }: { transactionId: number }) {
  return (
    <div className="flex justify-end gap-2">
      <button className="btn btn-ghost btn-xs align-middle">
        <PencilSquareIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => deleteTransaction(transactionId)}
        className="btn btn-ghost btn-xs align-middle"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
