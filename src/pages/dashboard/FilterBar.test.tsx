import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  it('필터가 기본 값으로 잘 작동하는지 확인하라', () => {
    const filters = { category: 'food', sort: 'date_desc' };
    const setFilters = vi.fn();

    render(<FilterBar filters={filters} setFilters={setFilters} />);

    // 필터 작동 여부 확인
    const categorySelect = screen.getByLabelText(
      /category/i
    ) as HTMLSelectElement;
    expect(categorySelect.value).toBe('food');

    const sortSelect = screen.getByLabelText(/sort/i) as HTMLSelectElement;
    expect(sortSelect.value).toBe('date_desc');
  });

  it('카테고리 필터 변경을 확인하라', () => {
    const filters = { category: '', sort: 'date_desc' };
    const setFilters = vi.fn();

    render(<FilterBar filters={filters} setFilters={setFilters} />);

    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: 'shopping' } });

    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });

  it('소트 필터 변경을 확인하라', () => {
    const filters = { category: '', sort: 'date_desc' };
    const setFilters = vi.fn();

    render(<FilterBar filters={filters} setFilters={setFilters} />);

    const sortSelect = screen.getByLabelText(/sort/i);
    fireEvent.change(sortSelect, { target: { value: 'amount_asc' } });

    expect(setFilters).toHaveBeenCalledTimes(1);
    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
  });
});
