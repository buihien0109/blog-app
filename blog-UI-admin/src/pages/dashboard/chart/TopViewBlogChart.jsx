import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top bài viết được xem nhiều nhất trong tháng',
    },
  },
};

function TopViewBlogChart(props) {
  const data = {
    labels: props.data.map((blog) => blog?.title.slice(0, 10) + '...'),
    datasets: [
      {
        label: 'Lượt xem',
        data: props.data.map((blog) => blog?.viewCount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default TopViewBlogChart;
