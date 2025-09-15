import { Meta } from './meta';

export enum Category {
  Food = 'food',
  Transport = 'transport',
  Shopping = 'shopping',
  Salary = 'salary',
  Other = 'other',
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  note: string;
}

export interface TransactionsResponse extends Meta {
  data?: Transaction[];
}

export interface Filters {
  category?: string;
  sort?: string;
}

export interface ApiResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}
