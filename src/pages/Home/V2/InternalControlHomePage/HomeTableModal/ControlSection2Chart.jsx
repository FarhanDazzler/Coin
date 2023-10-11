import React from 'react';
import Chart from 'react-apexcharts';

const ControlSection2Chart = () => {
  return (
    <div className="controlSection2ChartWrapper w-full">
      <Chart
        options={{
          chart: {
            id: 'apexchart-example',
          },
          type: 'line',
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },
          grid: {
            row: {
              colors: ['#505050', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        }}
        series={[
          {
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ControlSection2Chart;
