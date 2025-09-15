import { render, screen } from '@testing-library/react';
import TransactionList from './TransactionList';
import { describe, it, expect } from 'vitest';
import { Category, Transaction } from '../types/transaction';

const mockData: Transaction[] = [
  {
    id: '1',
    date: new Date(2025, 0, 1).toISOString(),
    amount: 5000,
    category: Category.Food,
    note: 'Sample transaction 1',
  },
  {
    id: '2',
    date: new Date(2025, 0, 2).toISOString(),
    amount: 12000,
    category: Category.Shopping,
    note: 'Sample transaction 2',
  },
];

describe('TransactionList', () => {
  it('데이터가 있을 때 테이블이 잘 렌더를 확인하라', () => {
    render(<TransactionList data={mockData} total={mockData.length} />);

    // 테이블 제목 확인
    expect(screen.getByText(/Transactions \(Total: 2\)/i)).toBeInTheDocument();

    // 각 row 데이터 확인
    mockData.forEach((t) => {
      expect(screen.getByText(t.category)).toBeInTheDocument();
      expect(screen.getByText(String(t.amount))).toBeInTheDocument();
      expect(screen.getByText(t.note)).toBeInTheDocument();
    });

    // row 개수 확인 (헤더 + 데이터)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockData.length + 1);
  });

  it('데이터가 없을 때 테이블의 렌더를 확인하라', () => {
    render(<TransactionList data={[]} total={0} />);

    expect(screen.getByText(/Transactions \(Total: 0\)/i)).toBeInTheDocument();
    // tbody 안에 tr이 없는지 확인
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBe(1); // 헤더 row만 존재
  });
});
