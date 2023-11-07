import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ControlSection2Chart = () => {
  const [series, setSeries] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const data = {
    kips: ['KIP_xyz', 'KIP_abc', 'KIP_def'],
    receivers: ['india', 'nepal', 'china'],
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
    const kpiData = data.data;
    const series = [];
    const xCategories = [];
    Object.keys(kpiData).map((kpiId, kpiIndex) => {
      const receivers = kpiData[kpiId].receivers;
      Object.keys(receivers).map((recKey, i) => {
        const country = receivers[recKey];
        if (i === 0) {
          Object.keys(country).map((name) => {
            xCategories.push(`${name} (${kpiId})`);
          });
        }
      });
    });
    setXAxis(xCategories);

    Object.keys(kpiData).map((kpiId, kpiIndex) => {
      const receivers = kpiData[kpiId].receivers;
      Object.keys(receivers).map((recKey, i) => {
        const country = receivers[recKey];
        const values = [];
        if (kpiIndex) {
          const indexVal = kpiIndex * Object.keys(country).length - 1;
          for (let i = 0; i <= indexVal; i++) {
            values.push(0);
          }
        }
        Object.keys(country).map((name, i) => {
          values.push(+country[name]);
        });
        const data = xCategories.map((d, catIndex) => {
          return values[catIndex] || 0;
        });
        series.push({
          name: recKey,
          data,
        });
      });
    });
    setSeries(series);
  }, []);

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
            categories: xAxis,
          },
          // yaxis: {
          //   title: {
          //     text: '$ (thousands)',
          //   },
          // },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                if (val) return val;
              },
            },
          },
        }}
        series={series}
        height={350}
      />
    </div>
  );
};

export default ControlSection2Chart;
