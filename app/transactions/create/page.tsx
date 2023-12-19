import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleOutlineIcon } from "@heroicons/react/24/outline";
import { fetchBooks } from "@/data";

export default async function Transactions() {
  const books = await fetchBooks();

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <h1>Create transaction</h1>
      <form>
        <div className="flex">
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              maxLength={100}
              required
            />
          </label>
          <div className="hidden peer-has-[:valid]:flex flex-col">
            <div className="h-9" />
            <div className="flex items-center h-12 ml-2">
              <CheckCircleIcon className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
        <div className="flex">
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Amount</span>
            </div>
            <input
              type="number"
              className="input input-bordered w-full"
              min="0.01"
              step="0.01"
              required
            />
          </label>
          <div className="hidden peer-has-[:valid]:flex flex-col">
            <div className="h-9" />
            <div className="flex items-center h-12 ml-2">
              <CheckCircleIcon className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
        <div className="flex">
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              defaultValue={today}
              required
            />
          </label>
          <div className="hidden peer-has-[:valid]:flex flex-col">
            <div className="h-9" />
            <div className="flex items-center h-12 ml-2">
              <CheckCircleIcon className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
        <div className="flex">
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Receipt (optional)</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full text-sm"
            />
          </label>
          <div className="hidden peer-has-[:valid]:flex flex-col">
            <div className="h-9" />
            <div className="flex items-center h-12 ml-2">
              <CheckCircleOutlineIcon className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
        <div className="flex">
          <label className="peer form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text">Book (optional)</span>
            </div>
            <select
              className="select select-bordered w-full"
              defaultValue="No book selected"
            >
              <option>No book selected</option>
              {books.map((book) => (
                <option key={book.id}>{book.title}</option>
              ))}
            </select>
          </label>
          <div className="hidden peer-has-[:valid]:flex flex-col">
            <div className="h-9" />
            <div className="flex items-center h-12 ml-2">
              <CheckCircleOutlineIcon className="w-10 h-10 text-success" />
            </div>
          </div>
        </div>
        <div className="h-6" />
        <input
          type="submit"
          className="btn btn-primary"
          value="Create my transaction"
        />
      </form>
    </>
  );
}
