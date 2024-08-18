import { Suspense } from "react";
import Error from "@/components/error";
import FormSkeleton from "@/app/transactions/components/form-skeleton";
import Form from "@/app/transactions/components/form";
import { fetchBooks } from "@/data";

export default function CreateTransaction() {
  return (
    <>
      <h1>Create transaction</h1>
      <Suspense fallback={<FormSkeleton />}>
        <Error>
          <FormWrapper />
        </Error>
      </Suspense>
    </>
  );
}

async function FormWrapper() {
  const books = await fetchBooks();

  return <Form books={books} />;
}
