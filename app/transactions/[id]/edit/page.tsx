import { Suspense } from "react";
import FormSkeleton from "@/app/transactions/components/form-skeleton";
import Form from "@/app/transactions/components/form";
import { fetchTransactionById, fetchBooks } from "@/data";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function EditTransaction({ params }: Params) {
  return (
    <>
      <h1>Edit transaction</h1>
      {/* No need for the Error component because of redirect to not found page. */}
      <Suspense fallback={<FormSkeleton />}>
        <FormWrapper params={params} />
      </Suspense>
    </>
  );
}

async function FormWrapper({ params }: Params) {
  const id = params.id;

  const [books, transaction] = await Promise.all([
    fetchBooks(),
    fetchTransactionById(id),
  ]);

  if (!transaction) {
    notFound();
  }

  return <Form books={books} transaction={transaction} />;
}
