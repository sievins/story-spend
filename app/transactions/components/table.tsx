import { Suspense } from "react";
import { ReceiptRefundIcon } from "@heroicons/react/24/solid";
import Pagination from "@/components/pagination";
import Error from "@/components/error";
import Actions from "@/app/transactions/components/actions";
import { fetchTransactions, fetchTransactionsPages } from "@/data";

export default function TableWrapper({ currentPage }: { currentPage: number }) {
  return (
    <div className="card card-normal bg-base-100 shadow-xl">
      <div className="card-body max-lg:!p-4">
        <Suspense key={currentPage} fallback={<TableSkeleton />}>
          <Error>
            <Table currentPage={currentPage} />
          </Error>
        </Suspense>
      </div>
    </div>
  );
}

async function Table({ currentPage }: { currentPage: number }) {
  const [totalPages, transactions] = await Promise.all([
    fetchTransactionsPages(),
    fetchTransactions(currentPage),
  ]);

  return (
    <>
      {/* Allow tooltip errors (on delete) to overlow on large screens */}
      <div className="overflow-x-auto lg:overflow-x-visible">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Book</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="leading-8">
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.book?.title}</td>
                <td>
                  <button className="btn btn-ghost btn-xs align-middle">
                    <ReceiptRefundIcon className="h-5 w-5" />
                  </button>
                </td>
                <td>
                  <Actions transactionId={transaction.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-3 my-7">
      <div className="flex gap-12 h-10 max-lg:hidden">
        <div className="skeleton w-28"></div>
        <div className="skeleton w-28"></div>
        <div className="skeleton w-28"></div>
        <div className="skeleton w-28"></div>
        <div className="skeleton w-28"></div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
      </div>
    </div>
  );
}
