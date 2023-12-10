import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Table from "@/app/transactions/table";

export default function Transactions() {
  return (
    <>
      <h1>Transactions</h1>
      <Link className="btn self-end" href="/transactions/create">
        Add Transaction
        <PlusIcon className="h-5 w-5" />
      </Link>
      <div className="h-4" />
      <Table />
    </>
  );
}
