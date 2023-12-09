import {
  ReceiptRefundIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Pagination from "@/components/pagination";

export default function Table() {
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
              <tr className="leading-8">
                <td>Publisher</td>
                <td>£7.12</td>
                <td>12/02/2024</td>
                <td>Feathers of Snow</td>
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
              <tr className="leading-8">
                <td>Editor - Sarah</td>
                <td>£204.12</td>
                <td>11/04/2023</td>
                <td>Silent Melody</td>
                <td />
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
              <tr className="leading-8">
                <td>Brice Swyre</td>
                <td>£300</td>
                <td>04/01/2021</td>
                <td />
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
              <tr className="leading-8">
                <td>Publisher</td>
                <td>£7.12</td>
                <td>12/02/2024</td>
                <td>Feathers of Snow</td>
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
              <tr className="leading-8">
                <td>Editor - Sarah</td>
                <td>£204.12</td>
                <td>11/04/2023</td>
                <td>Silent Melody</td>
                <td />
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
              <tr className="leading-8">
                <td>Brice Swyre</td>
                <td>£300</td>
                <td>04/01/2021</td>
                <td />
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
