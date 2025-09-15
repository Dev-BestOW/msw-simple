import { useQuery } from '@tanstack/react-query';
import TransactionService from '../services/transactionsService';
import { Filters, ApiResponse } from '../types/transaction';

export function useTransactions(filters: Filters) {
  return useQuery<ApiResponse>({
    queryKey: ['transactions', filters],
    queryFn: () => TransactionService.getData(filters),
  });
}
