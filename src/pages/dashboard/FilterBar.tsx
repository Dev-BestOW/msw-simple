import React from 'react';

type Props = {
  filters: { category: string; sort: string };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export default function FilterBar({ filters, setFilters }: Props) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Category:{' '}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="shopping">Shopping</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Sort:{' '}
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, sort: e.target.value }))
          }
        >
          <option value="date_desc">Date ↓</option>
          <option value="date_asc">Date ↑</option>
          <option value="amount_desc">Amount ↓</option>
          <option value="amount_asc">Amount ↑</option>
        </select>
      </label>
    </div>
  );
}
