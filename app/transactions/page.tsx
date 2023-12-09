import Table from "@/app/transactions/table";

export default function Transactions() {
  return (
    <main className="flex flex-col lg:p-16 lg:pt-12 p-6 pt-4">
      <h1>Transactions</h1>
      <Table />
    </main>
  );
}
