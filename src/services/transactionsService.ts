import { Filters } from '../types/transaction';
import instance from '../utils/http';

const url = '/transactions';

export default class TransactionService {
  static async getData(filters: Filters) {
    const res = await instance.get(url, { params: filters });
    return res.data;
  }

  // post , update , delete 등 확장성을 고려하여 남김
}
