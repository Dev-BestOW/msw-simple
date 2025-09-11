import { Category, Transaction } from "../types/transaction";

const categories = Object.values(Category);

export const transactions: Transaction[] = Array.from({ length: 50 }).map((_, i) => ({
  id: String(i + 1),
  date: new Date(2025, 0, (i % 28) + 1).toISOString(),
  amount: Math.floor(Math.random() * 10000),
  category: categories[i % categories.length],
  note: `Sample transaction ${i + 1}`,
}));