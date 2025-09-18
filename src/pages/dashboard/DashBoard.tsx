import { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import TransactionList from './TransactionList';
import TransactionChart from './TransactionChart';
import { useTransactions } from '../../hooks/useTransactions';

export default function Dashboard() {
  const [filters, setFilters] = useState({ category: '', sort: 'date_desc' });
  const { data, isLoading, isError, error } = useTransactions(filters);

  useEffect(() => {
    if (isError && error) {
      const status = error.response?.status;
      if (status === 401) {
        return alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      }
      if (status === 403) {
        return alert('접근 권한이 없습니다.');
      }
      alert('알 수 없는 오류가 발생했습니다.');
    }
  }, [isError, error]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} />
      <TransactionChart data={data?.data ?? []} />
      <TransactionList data={data?.data ?? []} total={data?.total ?? 0} />
    </div>
  );
}
