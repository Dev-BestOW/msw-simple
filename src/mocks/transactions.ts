import { http, HttpResponse } from 'msw';
import { TransactionsResponse } from '../types/transaction';
import { withAuth } from './authCheck';
import { transactions } from './data';

export const getTransactions = http.get(
  '/api/transactions',
  async ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(url.searchParams.get('pageSize') || '20');
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort') || 'date_desc';

    let filtered = [...transactions];
    if (category) filtered = filtered.filter((t) => t.category === category);

    if (sort === 'date_asc') {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    if (sort === 'date_desc') {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    if (sort === 'amount_asc') filtered.sort((a, b) => a.amount - b.amount);
    if (sort === 'amount_desc') filtered.sort((a, b) => b.amount - a.amount);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paged = filtered.slice(start, end);

    return HttpResponse.json<TransactionsResponse>(
      {
        data: paged,
        total: filtered.length,
        page,
        pageSize,
      },
      { status: 200 }
    );
  }
);

export const secureGetTransctions = http.get(
  '/api/transactions',
  withAuth(async ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(url.searchParams.get('pageSize') || '20');
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort') || 'date_desc';

    let filtered = [...transactions];
    if (category) filtered = filtered.filter((t) => t.category === category);

    if (sort === 'date_asc') {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    if (sort === 'date_desc') {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    if (sort === 'amount_asc') filtered.sort((a, b) => a.amount - b.amount);
    if (sort === 'amount_desc') filtered.sort((a, b) => b.amount - a.amount);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paged = filtered.slice(start, end);

    return HttpResponse.json<TransactionsResponse>(
      {
        data: paged,
        total: filtered.length,
        page,
        pageSize,
      },
      { status: 200 }
    );
  }, 'role')
);
