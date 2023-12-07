import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';

// const data = [
//   {
//     name: 'Jan_23',
//     Argentina: null,
//     Botswana: 680,
//     L1_Threshold: null,
//     L2_Threshold: 800,
//     L3_Threshold: null,
//   },
//   {
//     name: 'Feb_23',
//     Argentina: 400,
//     Botswana: 580,
//     L1_Threshold: null,
//     L2_Threshold: '800',
//     L3_Threshold: null,
//   },
//   {
//     name: 'March_23',
//     Argentina: 200,
//     Botswana: 680,
//     L1_Threshold: null,
//     L2_Threshold: 800,
//     L3_Threshold: null,
//   },
//   {
//     name: 'Apirl_23',
//     Argentina: 10,
//     Botswana: 680,
//     L1_Threshold: null,
//     L2_Threshold: 800,
//     L3_Threshold: null,
//   },
// ];

function convertData(key, data) {
  const kpiData = data[key];
  const receivers = kpiData.receivers;
  const thresholds = kpiData.thresholds;

  const data_2 = Object.keys(receivers.Argentina).map((date) => ({
    name: date,
    Argentina: convertToInteger(receivers.Argentina[date]),
    Botswana: convertToInteger(receivers.Botswana[date]),
    L1_Threshold: convertToInteger(thresholds.L1_Threshold),
    L2_Threshold: convertToInteger(thresholds.L2_Threshold),
    L3_Threshold: convertToInteger(thresholds.L3_Threshold),
  }));

  // Sort the array by year and month
  data_2.sort((a, b) => {
    const dateA = new Date(a.name);
    const dateB = new Date(b.name);
    return dateA - dateB;
  });

  return data_2;
}

function convertToInteger(value) {
  if (value === 'nan' || value === '-' || value === '') {
    return null;
  }
  return parseInt(value, 10);
}

const KIP_Graph_Section_2 = () => {
  const APIdata = {
    KPI_INV_02: {
      receivers: {
        Argentina: {
          Apr_23: '',
          Aug_23: '0.00',
          Jul_23: '993836.05',
          Jun_23: '17456232.00',
          May_23: '40.48',
        },
        Botswana: {
          Apr_23: '',
          Aug_23: '0.00',
          Jul_23: '0.16',
          Jun_23: '0.16',
          May_23: '',
        },
      },
      thresholds: {
        L1_Threshold: '-',
        L2_Threshold: '100000',
        L3_Threshold: '-',
      },
    },
    KPI_INV_03: {
      receivers: {
        Argentina: {
          Apr_23: '',
          Aug_23: '0.00',
          Jul_23: '0.00',
          Jun_23: '0.00',
          May_23: '0.00',
        },
        Botswana: {
          Apr_23: '',
          Aug_23: '0.00',
          Jul_23: '20222.70',
          Jun_23: '22804.84',
          May_23: '',
        },
      },
      thresholds: {
        L1_Threshold: '-',
        L2_Threshold: '0',
        L3_Threshold: '-',
      },
    },
    KPI_INV_04: {
      receivers: {
        Argentina: {
          Aug_23: 'nan',
          Jul_23: 'nan',
          Jun_23: 'nan',
        },
        Botswana: {
          Aug_23: 'nan',
          Jul_23: 'nan',
          Jun_23: 'nan',
        },
      },
      thresholds: {
        L1_Threshold: '-',
        L2_Threshold: '-',
        L3_Threshold: '0',
      },
    },
  };

  const data = convertData('KPI_INV_03', APIdata);
  return (
    <>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="name"
          // label={{
          //   value: "Receivers",
          //   position: "insideBottomRight",
          //   offset: 0
          // }}
          scale="band"
        />
        <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Argentina" barSize={20} fill="#413ea0" />
        <Bar dataKey="Botswana" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="L1_Threshold" stroke="#ff7300" />
        <Line type="monotone" dataKey="L2_Threshold" stroke="#ff7300" />
        <Line type="monotone" dataKey="L3_Threshold" stroke="#ff7300" />
      </ComposedChart>
    </>
  );
};

export default KIP_Graph_Section_2;
