import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Table from "@/app/books/components/table";

export default function Books() {
  return (
    <>
      <h1>Books</h1>
      <Link className="btn self-end" href="/books/create">
        Add book
        <PlusIcon className="h-5 w-5" />
      </Link>
      <div className="h-4" />
      <Table />
    </>
  );
}
