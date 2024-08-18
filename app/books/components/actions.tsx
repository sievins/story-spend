"use client";

import EditDelete from "@/components/edit-delete";
import { deleteBook } from "@/actions";

// TODO: Handle deleting books with associated transactions.
export default function Actions({ bookId }: { bookId: number }) {
  return (
    <EditDelete
      itemId={bookId}
      editSlug="books"
      deleteItemAction={deleteBook}
    />
  );
}
