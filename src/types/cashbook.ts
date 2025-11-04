interface Transaction {
  id?: number;
  date: string;
  description: string;
  amount: number;
  category: number;
  category_name?: { category_name: string };
  mode: string;
}

interface Categories {
  category_id: string;
  category_name: string;
}

interface SummaryType {
  totalCashIn: number;
  totalCashOut: number;
  balance: number;
}

interface NewEntryProps {
  entryType: string;
  handleCashIn: () => void;
  handleCashOut: () => void;
}

interface TransactionProps {
  transaction: Transaction;
  handleEdit: (transaction: Transaction) => void;
  handleDelete: (transaction: Transaction) => void;
}

interface TransactionListProps {
  txs: Transaction[];
  handleEdit: (transaction: Transaction) => void;
  handleDelete: (transaction: Transaction) => void;
}

interface FiltersProps {
  categories: Categories[];
  startDate: Date | null;
  endDate: Date | null;
  handleCategoryFilter: (id: number) => void;
  handleTypeFilter: (value: string) => void;
  handleDateFilter: (update: [Date | null, Date | null]) => void;
}

interface InputProps {
  categories: Categories[];
  inputData: Transaction;
  handleInputData: (formData: Transaction) => void;
  entryType: string;
  handleFormClose: () => void;
}

interface SummaryProps {
  summary: SummaryType;
}

export type {
  Categories,
  Transaction,
  SummaryType,
  NewEntryProps,
  TransactionListProps,
  TransactionProps,
  FiltersProps,
  InputProps,
  SummaryProps,
};
