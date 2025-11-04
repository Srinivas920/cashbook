import { InputProps } from "@/types/cashbook";
import { useState } from "react";

const Input: React.FC<InputProps> = ({
  categories,
  inputData,
  handleInputData,
  entryType,
  handleFormClose,
}) => {
  const [formData, setFormData] = useState({
    ...inputData,
    category_id: 1,
    mode: entryType,
  });

  // useEffect(() => {
  //   if (categories.length > 0 && !formData.category) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       category: categories[0].category_id,
  //       // mode: entryType,
  //     }));
  //   }
  // }, [categories]);

  function handleFormInput(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleInputData(formData);
    setFormData({
      date: "",
      description: "",
      amount: 0,
      category_id: 1,
      mode: "",
    });
    handleFormClose();
  }
  // console.log(categories);
  console.log(formData);
  return (
    <div className="p-2">
      <form
        onSubmit={(event) => {
          handleFormInput(event);
        }}
      >
        <div className="my-3">
          <label className="block ">Date</label>
          <input
            type="date"
            value={formData.date}
            className="w-full border border-gray-600 rounded-sm p-1 mt-2"
            onChange={(event) => {
              setFormData({ ...formData, date: event.target.value });
            }}
          />
        </div>
        <div className="my-3">
          <label className="block ">Description</label>
          <input
            type="text"
            value={formData.description}
            placeholder="Enter Details"
            className="w-full border border-gray-600 rounded-sm p-1 mt-2"
            onChange={(event) => {
              setFormData({ ...formData, description: event.target.value });
            }}
          />
        </div>
        <div className="my-3">
          <label className="block ">Amount</label>
          <input
            type="number"
            value={formData.amount}
            placeholder="Enter Amount"
            className="w-full border border-gray-600 rounded-sm p-1 mt-2"
            onChange={(event) => {
              setFormData({
                ...formData,
                amount: parseInt(event.target.value),
              });
            }}
          />
        </div>
        <div className="my-3 flex justify-between">
          <label className="mr-2">Category</label>
          <select
            className="flex-1"
            value={formData.category_id}
            onChange={(event) => {
              setFormData({
                ...formData,
                category_id: parseInt(event.target.value),
              });
            }}
          >
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 my-1 py-2 w-full text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleFormClose}
          className="bg-red-500 my-1 py-2 w-full text-white"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default Input;
