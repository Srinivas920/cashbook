import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiltersProps } from "@/types/cashbook";

const Filters: React.FC<FiltersProps> = ({
  categories,
  startDate,
  endDate,
  handleCategoryFilter,
  handleTypeFilter,
  handleDateFilter,
}) => {
  // console.log(startDate, endDate);
  return (
    <div className="flex bg-gray-300 my-1 rounded-lg">
      {/* Date Picker */}
      <div className="flex p-2 gap-2">
        <label>Select Date</label>
        <DatePicker
          className="bg-gray-100 rounded cursor-pointer px-2 "
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => handleDateFilter(update)}
        />
      </div>
      {/* Category Picker */}
      <div className="flex p-2 gap-2">
        <div>Category</div>
        <select
          className="bg-gray-100 rounded"
          onChange={(event) => {
            handleCategoryFilter(parseInt(event.target.value));
          }}
        >
          <option value="0">All</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>
      </div>
      {/* Type Picker */}
      <div className="flex p-2 gap-2">
        <div>Type</div>
        <select
          className="bg-gray-100 rounded"
          onChange={(event) => {
            handleTypeFilter(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="CashIn">CashIn</option>
          <option value="CashOut">CashOut</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
