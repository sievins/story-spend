import { Suspense } from "react";
import Error from "@/components/error";
import Form from "@/app/transactions/create/components/form";
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

function FormSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-11 w-full max-w-sm mt-9">
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
        <div className="skeleton h-12"></div>
      </div>
      <div className="h-6" />
      <div className="skeleton h-12 w-44"></div>
    </div>
  );
}
