import { Transaction } from '../types/transaction';

type Props = { data: Transaction[]; total: number };

export default function TransactionList({ data, total }: Props) {
  return (
    <div>
      <h2>Transactions (Total: {total})</h2>
      <table
        border={1}
        cellPadding={6}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
