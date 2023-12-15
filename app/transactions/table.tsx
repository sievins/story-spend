import {
  ReceiptRefundIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Pagination from "@/components/pagination";
import { fetchTransactions } from "@/data";

export default async function Table() {
  const transactions = await fetchTransactions();

  return (
    <div className="card card-normal bg-base-100 shadow-xl">
      <div className="card-body max-lg:!p-4">
        <div className="overflow-x-auto">
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
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-ghost btn-xs align-middle">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="btn btn-ghost btn-xs align-middle">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-center">
          <Pagination totalPages={10} />
        </div>
      </div>
    </div>
  );
}
