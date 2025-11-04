"use client";

import NewEntry from "@/components/NewEntry";
import TransactionList from "@/components/TransactionList";
import Input from "@/components/Input";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import Summary from "@/components/Summary";
import { Transaction, Categories, SummaryType } from "@/types/cashbook";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  // const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ]);
  const [startDate, endDate]: [Date | null, Date | null] = dateRange;
  const [editId, setEditId] = useState<number>(0);
  const [entryType, setEntryType] = useState<string>("");
  const [inputData, setInputData] = useState<Transaction>({
    date: "",
    description: "",
    amount: 0,
    category: 1,
    mode: "",
  });
  const [summary, setSummary] = useState<SummaryType>({
    totalCashIn: 0,
    totalCashOut: 0,
    balance: 0,
  });

  //Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("category").select("*");
      setCategories(data || []);
      if (error) {
        console.log("Error in fetching Categories", error);
      }
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchTransactions();
  }, []);
  // Calculate Summary
  useEffect(() => {
    function calculateSummary(transactions: Transaction[]) {
      if (transactions.length > 0) {
        setSummary((prev) => ({
          ...prev,
          totalCashIn: transactions
            .filter((t) => t.mode === "CashIn")
            .reduce((acc, t) => acc + t.amount, 0),
          totalCashOut: transactions
            .filter((t) => t.mode === "CashOut")
            .reduce((acc, t) => acc + t.amount, 0),
        }));
      } else {
        setSummary({
          totalCashIn: 0,
          totalCashOut: 0,
          balance: 0,
        });
      }
    }
    calculateSummary(transactions);
  }, [transactions]);

  //Fetch transactions
  async function fetchTransactions() {
    const { data, error } = await supabase
      .from("transactions_test")
      .select(
        `id, date, description, amount, mode, category_id : category, category(category_name)`
      )
      .order("date", { ascending: false })
      .order("id", { ascending: false });

    if (error) {
      console.log("Fetching data failed", error);
    } else {
      // const transformedData = data.map((transaction) => ({
      //   ...transaction,
      //   category: transaction.category[0] ?? { category_name: "Uncategorized" },
      // }));
      console.log(data[1]);
      setTransactions((data as unknown as Transaction[]) || []);
    }

    // calculateSummary(transactions);
  }

  //Category Filter
  async function handleCategoryFilter(id: number) {
    console.log(id);
    if (id === 0) {
      fetchTransactions();
    } else {
      const { data } = await supabase
        .from("transactions_test")
        .select(
          "id, date, description, amount, mode, category_id : category, category(category_name)"
        )
        .eq("category", id)
        .order("date", { ascending: false });
      console.log(data);
      setTransactions((data as unknown as Transaction[]) || []);
    }
  }

  //Type Filter
  async function handleTypeFilter(value: string) {
    if (value === "CashIn") {
      const { data } = await supabase
        .from("transactions_test")
        .select(
          "id, date, description, amount, mode, category_id : category, category(category_name)"
        )
        .eq("mode", "CashIn")
        .order("date", { ascending: false });
      console.log(data);
      setTransactions((data as unknown as Transaction[]) || []);
    } else if (value === "CashOut") {
      const { data } = await supabase
        .from("transactions_test")
        .select(
          "id, date, description, amount, mode, category_id : category, category(category_name)"
        )
        .eq("mode", "CashOut")
        .order("date", { ascending: false });
      console.log(data);
      setTransactions((data as unknown as Transaction[]) || []);
    } else if (value === "all") {
      fetchTransactions();
    }
  }

  //Date Filter
  async function handleDateFilter([date1, date2]: [Date | null, Date | null]) {
    // const year = update[1].getFullYear();
    // const month = String(update[1].getMonth() + 1).padStart(2, "0");
    // const day = String(update[1].getDate()).padStart(2, "0");
    const sDate = date1?.toLocaleDateString("en-CA");
    const eDate = date2?.toLocaleDateString("en-CA");
    console.log(sDate);
    console.log(eDate);
    // const sDate = `${date1?.getFullYear()}-${String(
    //   date1?.getMonth() + 1
    // ).padStart(2, "0")}-${String(date1?.getDate()).padStart(2, "0")}`;
    // const eDate = `${date2?.getFullYear()}-${String(
    //   date2?.getMonth() + 1
    // ).padStart(2, "0")}-${String(date2?.getDate()).padStart(2, "0")}`;

    setDateRange([date1, date2]);

    const { data, error } = await supabase
      .from("transactions_test")
      .select(
        "id, date, description, amount, mode, category_id : category, category(category_name)"
      )
      .gte("date", sDate)
      .lte("date", eDate)
      .order("date", { ascending: false });
    if (error) {
      console.log(error);
    }
    console.log(data);
    setTransactions((data as unknown as Transaction[]) || []);
  }
  //Form Input
  async function handleInputData(formData: Transaction) {
    setInputData(formData);
    console.log(editId);
    // console.log("Form Data :", formData);
    //UPDATE
    if (editId !== 0) {
      const { category_name, ...updatedData } = formData;
      console.log("Form Data :", updatedData);
      const { error } = await supabase
        .from("transactions_test")
        .update(updatedData)
        .eq("id", editId);
      if (error) {
        toast.error(`Updating record failed ${error.message}`);
      } else {
        toast.success(`Updated record successfully`);
      }
      setEditId(0);
    } else {
      //ADD
      const { error } = await supabase
        .from("transactions_test")
        .insert([formData]);
      if (error) {
        toast.error(`Adding record failed ${error.message}`);
      } else {
        toast.success(`Adding record successfully`);
      }
    }
    fetchTransactions();
  }

  //Cancel Button

  async function handleFormClose() {
    setInputData({
      date: "",
      description: "",
      amount: 0,
      category: 0,
      mode: "",
    });
    setEntryType("");
  }

  // Edit Data

  async function handleEdit(transaction: Transaction) {
    if (transaction.id !== undefined) {
      setEditId(transaction.id);
    }
    console.log(transaction.id);
    setInputData(transaction);
    if (transaction.mode === "CashIn") {
      setInputData(transaction);
      setEntryType("CashIn");
    } else {
      setInputData(transaction);
      setEntryType("CashOut");
    }
  }

  // Delete Data
  async function handleDelete(transaction: Transaction) {
    console.log(transaction.id);
    const { error } = await supabase
      .from("transactions_test")
      .delete()
      .eq("id", transaction.id);
    if (error) {
      toast.error(`Deletion of record failed ${error.message}`);
    } else {
      toast.success("Deleted record successfully");
    }
    fetchTransactions();
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Filters
            handleCategoryFilter={handleCategoryFilter}
            categories={categories}
            handleTypeFilter={handleTypeFilter}
            startDate={startDate}
            endDate={endDate}
            handleDateFilter={handleDateFilter}
          />
        </div>
        <Toaster />
      </div>
      <div className=" flex flex-1">
        <div className="flex-1">
          <TransactionList
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            txs={transactions}
          />
        </div>
        <div className="min-w-56">
          <NewEntry
            entryType={entryType}
            handleCashIn={() => {
              setEntryType("CashIn");
            }}
            handleCashOut={() => {
              setEntryType("CashOut");
            }}
          />
          {entryType && (
            <Input
              entryType={entryType}
              categories={categories}
              inputData={inputData}
              handleInputData={handleInputData}
              handleFormClose={handleFormClose}
            />
          )}
          {!entryType && <Summary summary={summary} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
