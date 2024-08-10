import { Suspense } from "react";
import Error from "@/components/error";
import Actions from "@/app/books/components/actions";
import { fetchBooks } from "@/data";
import domPurify from "@/lib/dom-purify";

export default function TableWrapper() {
  return (
    <div className="card card-normal bg-base-100 shadow-xl">
      <div className="card-body max-lg:!p-4">
        <Suspense fallback={<TableSkeleton />}>
          <Error>
            <Table />
          </Error>
        </Suspense>
      </div>
    </div>
  );
}

async function Table() {
  const books = await fetchBooks();

  const noBooks = books.length === 0;
  if (noBooks) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mb-7">
        <h2>No books</h2>
        <p>Add a book by clicking the button above.</p>
      </div>
    );
  }

  {
    /* Allow tooltip errors (on delete) to overlow on large screens */
  }
  return (
    <div className="overflow-x-auto lg:overflow-x-visible">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="leading-8">
              <td>{domPurify(book.title)}</td>
              <td>
                <Actions bookId={book.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-3 my-7">
      <div className="flex gap-12 h-10 max-lg:hidden">
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
