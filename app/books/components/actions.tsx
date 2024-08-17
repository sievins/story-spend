"use client";

import EditDelete from "@/components/edit-delete";
import { deleteBook } from "@/actions";

export default function Actions({ bookId }: { bookId: number }) {
  return (
    <EditDelete
      itemId={bookId}
      editSlug="books"
      deleteItemAction={deleteBook}
    />
  );
}
