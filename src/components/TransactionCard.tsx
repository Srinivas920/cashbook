import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TransactionProps } from "@/types/cashbook";

const TransactionCard: React.FC<TransactionProps> = ({
  transaction,
  handleEdit,
  handleDelete,
}) => {
  // console.log(transaction);
  return (
    <div className="my-1 shadow-2xl hover:scale-99">
      <ul
        className={`flex  font-semibold text-lg rounded-l-lg ${
          transaction.mode === "CashIn"
            ? "border-s-8 border-green-600"
            : "border-s-8 border-red-600"
        }`}
      >
        <li className="flex-1 text-center p-3">{transaction.date}</li>
        <li className="flex-2 p-3">{transaction.description}</li>
        <li className="flex-1 p-3">
          {transaction.category_name?.[0]?.category_name}
        </li>
        <li
          className={`flex-1 text-right py-3 pr-10 ${
            transaction.mode === "CashIn" ? "text-green-600" : " text-red-600"
          }`}
        >
          {transaction.amount}
        </li>
        <button
          onClick={() => {
            handleEdit(transaction);
          }}
          className="py-5 pr-3"
        >
          <CiEdit size={20} />
        </button>
        <button
          onClick={() => {
            handleDelete(transaction);
          }}
          className="py-5 pr-3"
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </ul>
    </div>
  );
};

export default TransactionCard;
