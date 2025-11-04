import { FaMinus, FaPlus } from "react-icons/fa";
import { NewEntryProps } from "@/types/cashbook";

const NewEntry: React.FC<NewEntryProps> = ({
  entryType,
  handleCashIn,
  handleCashOut,
}) => {
  return (
    <div className="ml-2 min-w-48 flex flex-col gap-y-2 ">
      {!(entryType === "CashOut") && (
        <button
          className="flex px-1 justify-between bg-linear-to-r from-green-700 to-green-800 font-semibold py-2 text-white text-lg hover:cursor-pointer hover:scale-102"
          onClick={() => {
            handleCashIn();
          }}
        >
          <FaPlus className="m-1.5" />
          <p className="pr-3">Cash In</p>
        </button>
      )}
      {!(entryType === "CashIn") && (
        <button
          className="flex px-1 justify-between bg-linear-to-r from-red-600 to-red-800 font-semibold py-2 text-white text-lg hover:cursor-pointer hover:scale-102"
          onClick={() => {
            handleCashOut();
          }}
        >
          <FaMinus className="m-1.5" />
          <p className="pr-3">Cash Out</p>
        </button>
      )}
    </div>
  );
};

export default NewEntry;
