import TransactionService from '../transactionsService';

describe('TransactionService', () => {
  it('api가 정상작동하는지 확인하라', async () => {
    const filters = { category: 'food', sort: 'date_desc' };
    const data = await TransactionService.getData(filters);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[0].category).toBe('food');
  });
});
