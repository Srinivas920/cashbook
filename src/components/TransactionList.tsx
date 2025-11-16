import { Transaction, TransactionListProps } from "@/types/cashbook";
import TransactionCard from "./TransactionCard";
import { useState } from "react";

const TransactionList: React.FC<TransactionListProps> = ({
  txs,
  handleEdit,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const txsPerPage = 10;
  const totalPages = Math.ceil(txs.length / txsPerPage);
  const start = (currentPage - 1) * txsPerPage;
  const currentTxs: Transaction[] = txs.slice(start, start + txsPerPage);

  return (
    <div>
      <ul className="flex text-amber-100 rounded-lg bg-amber-600   text-xl font-medium">
        <li className="flex-1 text-center p-3">Date</li>
        <li className="flex-2 p-3">Description</li>
        <li className="flex-1 p-3">Category</li>
        <li className="flex-1 p-3">Amount</li>
        <li className="p-3"></li>
      </ul>
      {currentTxs.map((transaction) => (
        <TransactionCard
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          key={transaction.id}
          transaction={transaction}
        />
      ))}
      {(!currentTxs || !(totalPages === 1)) && (
        <div className="text-white flex justify-center gap-2 my-4">
          <button
            className="bg-sky-600 py-2 px-6 cursor-pointer disabled:bg-gray-500 hover:scale-102 hover:bg-sky-400 rounded-xl"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-sky-600 py-2 px-10 cursor-pointer disabled:bg-gray-500 hover:scale-102 hover:bg-sky-400 rounded-xl"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
