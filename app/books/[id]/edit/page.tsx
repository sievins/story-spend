import { Suspense } from "react";
import Form from "@/app/books/components/form";
import { fetchBookById } from "@/data";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function EditBook({ params }: Params) {
  return (
    <>
      <h1>Edit book</h1>
      {/* No need for the Error component because of redirect to not found page. */}
      <Suspense fallback={<FormSkeleton />}>
        <FormWrapper params={params} />
      </Suspense>
    </>
  );
}

async function FormWrapper({ params }: Params) {
  const id = params.id;

  const book = await fetchBookById(id);

  if (!book) {
    notFound();
  }

  return <Form book={book} />;
}

function FormSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-11 w-full max-w-sm mt-9">
        <div className="skeleton h-12"></div>
      </div>
      <div className="h-6" />
      <div className="skeleton h-12 w-44"></div>
    </div>
  );
}
