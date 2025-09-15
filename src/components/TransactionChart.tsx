import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Transaction } from '../types/transaction';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = { data: Transaction[] };

export default function TransactionChart({ data }: Props) {
  const categoryTotals: Record<string, number> = {};
  data.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] ?? 0) + t.amount;
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Amount by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: '1rem auto' }}>
      <h2>Spending by Category</h2>
      <Pie data={chartData} />
    </div>
  );
}
