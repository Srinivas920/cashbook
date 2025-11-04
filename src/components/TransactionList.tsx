import { TransactionListProps } from "@/types/cashbook";
import TransactionCard from "./TransactionCard";

const TransactionList: React.FC<TransactionListProps> = ({
  txs,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      <ul className="flex text-amber-100 rounded-lg bg-amber-600   text-xl font-medium">
        <li className="flex-1 text-center p-3">Date</li>
        <li className="flex-2 p-3">Description</li>
        <li className="flex-1 p-3">Category</li>
        <li className="flex-1 p-3">Amount</li>
        <li className="p-3"></li>
      </ul>
      {txs.map((transaction) => (
        <TransactionCard
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

export default TransactionList;
