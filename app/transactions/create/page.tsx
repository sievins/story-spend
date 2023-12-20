import Form from "@/app/transactions/create/components/form";
import { fetchBooks } from "@/data";

export default async function Transactions() {
  const books = await fetchBooks();

  return (
    <>
      <h1>Create transaction</h1>
      <Form books={books} />
    </>
  );
}
