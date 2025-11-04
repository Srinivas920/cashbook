import { SummaryProps } from "@/types/cashbook";

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="ml-2 text-center ">
      <div className="w-full rounded-2xl border-2 border-green-300 mt-2 p-2 text-2xl bg-green-100">
        <h1 className="font-bold">Total Cash In</h1>
        <h2 className="font-semibold">{summary.totalCashIn}</h2>
      </div>
      <div className="w-full rounded-2xl border-2 border-red-300 mt-2 p-2 text-2xl bg-red-100">
        <h1 className="font-bold">Total Cash Out</h1>
        <h2 className="font-semibold">{summary.totalCashOut}</h2>
      </div>
      <div className="w-full rounded-2xl border-2 border-blue-300 mt-2 p-2 text-2xl bg-blue-100">
        <h1 className="font-bold">Balance</h1>
        <h2 className="font-semibold">
          {summary.totalCashIn - summary.totalCashOut}
        </h2>
      </div>
    </div>
  );
};

export default Summary;
