import Error from "@/components/error";
import Form from "@/app/books/components/form";
import { fetchBookById } from "@/data";
import { notFound } from "next/navigation";
import type { Book } from "@prisma/client";

export default async function EditBook({ params }: { params: { id: string } }) {
  const id = params.id;

  const book = await fetchBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <>
      <h1>Edit book</h1>
      <Error>
        <FormWrapper book={book} />
      </Error>
    </>
  );
}

async function FormWrapper({ book }: { book: Book }) {
  return <Form book={book} />;
}
