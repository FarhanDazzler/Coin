import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import {
  getResponseSelector,
  kpiResultSelector,
} from '../../../../../redux/Assessments/AssessmentSelectors';
import useWindowDimensions from '../../../../../hooks/useWindowDimensions';

function convertData(key, data) {
  if (!data) return [];
  const kpiData = data[key];
  if (!kpiData) return [];
  const receivers = kpiData.receivers;
  const thresholds = kpiData.thresholds;
  const data_2 = kpiData;
  //  Object.keys(receivers.Argentina).map((date) => ({
  //   name: date,
  //   Argentina: convertToInteger(receivers.Argentina[date]),
  //   Botswana: convertToInteger(receivers.Botswana[date]),
  //   L1_Threshold: convertToInteger(thresholds.L1_Threshold),
  //   L2_Threshold: convertToInteger(thresholds.L2_Threshold),
  //   L3_Threshold: convertToInteger(thresholds.L3_Threshold),
  // }));
  // Sort the array by year and month
  if (data_2?.length > 0)
    data_2?.sort((a, b) => {
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

const KIP_Graph_Section_2 = ({ isModal, isReview }) => {
  const kpiResultData = useSelector(kpiResultSelector);
  const getKPIResponse = useSelector(getResponseSelector);
  const kpiResult =
    isModal || isReview
      ? getKPIResponse?.data?.Latest_Response?.data
      : kpiResultData?.data?.data || getKPIResponse?.data?.Latest_Response?.data;
  const [KPIList, setKPIList] = useState(null);
  const [activeKPI, setActiveKPI] = useState();
  const [activeKPIObj, setActiveKPIObj] = useState(null);
  const { width } = useWindowDimensions();
  const handleKPIClick = (id) => {
    setActiveKPI(id);
    if (kpiResult) setActiveKPIObj(kpiResult[id]);
  };

  useEffect(() => {
    if (kpiResult) {
      setKPIList(Object.keys(kpiResult));
      const activeIdVal = Object.keys(kpiResult)[0];
      setActiveKPI(activeIdVal);
      setActiveKPIObj(kpiResult[activeIdVal]);
    }
  }, [kpiResultData?.data]);

  const data = convertData(activeKPI, kpiResult);
  const renderData =
    kpiResult && kpiResult[activeKPI]?.length
      ? Object.keys(kpiResult[activeKPI][0])?.filter((i) => {
          return !['L1_Threshold', 'L2_Threshold', 'L3_Threshold', 'name'].includes(i);
        })
      : [];
  console.log('datadatadatadata', data);
  return (
    <>
      <div className="d-flex">
        <div className="chart-wrapper">
          <ComposedChart
            // width={isModal && !isReview ? 600 : width - 180}
            width={width - 650}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <XAxis
              dataKey="name"
              label={{
                //value: "Receivers",
                position: 'insideBottomRight',
                offset: 0,
              }}
              //scale="band"
            />
            <YAxis label={{ value: 'KPI', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {renderData?.map((i) => (
              <Bar dataKey={i} barSize={20} fill="#413ea0" />
            ))}
            <Line type="monotone" dataKey="L1_Threshold" stroke="#ff7300" />
            <Line type="monotone" dataKey="L2_Threshold" stroke="#00FF00" />
            <Line type="monotone" dataKey="L3_Threshold" stroke="#ffc658" />
          </ComposedChart>
        </div>
        <div className="renderBlockWrapper" style={{ minWidth: isModal ? 300 : 450 }}>
          <div className="d-flex chart-info-table overflow-table">
            <table className="w-full">
              <tr>
                <th>KPI ID </th>
                {/*<th>KPI NAME</th>*/}
              </tr>

              <tbody>
                {KPIList?.map((list) => (
                  <tr key={list}>
                    <td>
                      <span
                        onClick={() => handleKPIClick(list)}
                        style={{ cursor: 'pointer', color: list === activeKPI ? '#f1c40f' : '' }}
                      >
                        {list}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default KIP_Graph_Section_2;
