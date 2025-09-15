import { useState } from 'react';
import FilterBar from './FilterBar';
import TransactionList from './TransactionList';
import TransactionChart from './TransactionChart';
import { useTransactions } from '../hooks/useTransactions';

export default function Dashboard() {
  const [filters, setFilters] = useState({ category: '', sort: 'date_desc' });
  const { data, isLoading, isError } = useTransactions(filters);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} />
      <TransactionChart data={data?.data ?? []} />
      <TransactionList data={data?.data ?? []} total={data?.total ?? 0} />
    </div>
  );
}
