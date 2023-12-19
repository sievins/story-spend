import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Table from "@/app/transactions/components/table";

export default function Transactions({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <h1>Transactions</h1>
      <Link className="btn self-end" href="/transactions/create">
        Add transaction
        <PlusIcon className="h-5 w-5" />
      </Link>
      <div className="h-4" />
      <Table currentPage={currentPage} />
    </>
  );
}
