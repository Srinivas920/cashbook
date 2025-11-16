import { SummaryProps } from "@/types/cashbook";

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="text-center ">
      <div className="w-full rounded-lg p-2 border-4 border-green-300 text-white  bg-green-900">
        <h1 className="text-left text-sm">Total Cash In</h1>
        <h2 className="font-semibold text-3xl">{summary.totalCashIn}</h2>
      </div>
      <div className="w-full rounded-lg mt-2 p-2 border-4 border-red-300  text-white bg-red-900">
        <h1 className="text-left text-sm">Total Cash Out</h1>
        <h2 className="font-semibold text-3xl">{summary.totalCashOut}</h2>
      </div>
      <div className="w-full rounded-lg border-4 border-blue-300 mt-2 p-2 text-white bg-blue-900">
        <h1 className="text-left text-sm">Balance</h1>
        <h2 className="font-semibold text-3xl">
          {summary.totalCashIn - summary.totalCashOut}
        </h2>
      </div>
    </div>
  );
};

export default Summary;
