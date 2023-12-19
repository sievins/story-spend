import { fetchBooks } from "@/data";

export default async function Transactions() {
  const books = await fetchBooks();

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <h1>Create Transaction</h1>
      <form>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-sm"
            required
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full max-w-sm"
            min="0.01"
            step="0.01"
            required
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Date</span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full max-w-sm"
            defaultValue={today}
            required
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Receipt (optional)</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-sm text-sm"
          />
        </label>
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Book (optional)</span>
          </div>
          <select className="select select-bordered">
            <option selected>No book selected</option>
            {books.map((book) => (
              <option key={book.id}>{book.title}</option>
            ))}
          </select>
        </label>
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
