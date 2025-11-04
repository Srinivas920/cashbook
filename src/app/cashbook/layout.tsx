import "../globals.css";
import { SlBookOpen } from "react-icons/sl";

const CashbookLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="bg-emerald-700 text-white p-3 rounded-lg flex justify-center items-center text-2xl">
        <SlBookOpen className="mr-3" />
        <h1 className="font-semibold">Cash Book</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default CashbookLayout;
