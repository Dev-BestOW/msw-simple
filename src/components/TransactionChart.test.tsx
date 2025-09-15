import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TransactionChart from './TransactionChart';

describe('TransactionChart', () => {
  it('차트의 렌더를 확인하라', () => {
    render(<TransactionChart data={[]} />);
    expect(screen.getByText(/Spending by Category/i)).toBeInTheDocument();
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });
});
