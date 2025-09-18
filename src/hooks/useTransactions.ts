import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import TransactionService from '../services/transactionsService';
import { Filters, ApiResponse } from '../types/transaction';

export function useTransactions(filters: Filters) {
  return useQuery<ApiResponse, AxiosError>({
    queryKey: ['transactions', filters],
    queryFn: () => TransactionService.getData(filters),
    retry: false,
  });
}
