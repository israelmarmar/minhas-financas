import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

const LineChart = ({ data, width, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const formattedData = data.map(point => ({
      x: point.x,
      y: point.y,
    }));

    if (chartInstance.current) {
      // Se houver um gráfico existente, destrua-o antes de criar um novo
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(point => point.x),
        datasets: [{
          label: 'Pontos',
          data: formattedData,
          borderColor: 'blue',
          fill: false,
        }],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            labels: data.map(point => point.x),
          },
        },
      },
    });
  }, [data, width, height]);

  return <canvas ref={chartRef} width={width} height={height} />;
};

export default LineChart;
