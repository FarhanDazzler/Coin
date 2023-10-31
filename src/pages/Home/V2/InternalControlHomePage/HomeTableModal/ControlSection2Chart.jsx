import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ControlSection2Chart = () => {
  const [series, setSeries] = useState([]);
  const data = {
    kips: ['KIP_xyz', 'KIP_abc', 'KIP_def'],
    receivers: ['india', 'china', 'nepal'],
    data: {
      KIP_xyz: {
        MICS_L1_Threshold: '-',
        MICS_L2_Threshold: '0.05',
        MICS_L3_Threshold: '0.01',
        receivers: {
          india: {
            jan: '0.7',
            feb: '0.9',
            march: '0.5',
          },
          nepal: {
            jan: '0.2',
            feb: '0.3',
            march: '0.5',
          },
          china: {
            jan: '0.4',
            feb: '0.8',
            march: '0.7',
          },
        },
      },
      KIP_abc: {
        MICS_L1_Threshold: '-',
        MICS_L2_Threshold: '0.05',
        MICS_L3_Threshold: '0.01',
        receivers: {
          india: {
            jan: '0.7',
            feb: '0.9',
            march: '0.5',
          },
          nepal: {
            jan: '0.2',
            feb: '0.3',
            march: '0.5',
          },
          china: {
            jan: '0.4',
            feb: '0.8',
            march: '0.7',
          },
        },
      },
      KIP_def: {
        MICS_L1_Threshold: '-',
        MICS_L2_Threshold: '0.05',
        MICS_L3_Threshold: '0.01',
        receivers: {
          india: {
            jan: '0.7',
            feb: '0.9',
            march: '0.5',
          },
          nepal: {
            jan: '0.2',
            feb: '0.3',
            march: '0.5',
          },
          china: {
            jan: '0.4',
            feb: '0.8',
            march: '0.7',
          },
        },
      },
    },
  };

  useEffect(() => {
    const activeKey = data.kips[0];
    const oneUser = data.data[activeKey];
    const series = {};
    Object.keys(oneUser.receivers).map((d, i) => {
      console.log('@@@@@@', oneUser.receivers[d], d);
    });
    return {
      name: 'Net Profit',
      data: [44, 55, 57, 56],
    };
  }, [data]);

  return (
    <div className="controlSection2ChartWrapper w-full">
      <ReactApexChart
        type="area"
        options={{
          chart: {
            type: 'line',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'March'],
          },
          yaxis: {
            title: {
              text: '$ (thousands)',
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return '$ ' + val + ' thousands';
              },
            },
          },
        }}
        series={[
          {
            name: 'india',
            data: [0.7, 0.2, 0.4],
          },
          {
            name: 'nepal',
            data: [0.9, 0.3, 0.8],
          },
          {
            name: 'china',
            data: [0.5, 0.5, 0.7],
          },
        ]}
        height={350}
      />
    </div>
  );
};

export default ControlSection2Chart;
