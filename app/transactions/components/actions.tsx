"use client";

import EditDelete from "@/components/edit-delete";
import { deleteTransaction } from "@/actions";

export default function Actions({ transactionId }: { transactionId: number }) {
  return (
    <EditDelete itemId={transactionId} deleteItemAction={deleteTransaction} />
  );
}
