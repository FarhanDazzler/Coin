import React, { useEffect, useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import {
  get_historical_graph_dataSelector,
  getResponseSelector,
  kpiResultSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { randomColor } from './color';

function convertData(key, data) {
  if (!data) return [];
  const kpiData = data[key];
  if (!kpiData) return [];
  const data_2 = kpiData;

  // Sort the array by year and month
  if (data_2?.length > 0)
    data_2?.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA - dateB;
    });

  return data_2;
}

const KIP_Graph_Section_2 = ({ isModal, isReview }) => {
  const kpiResultData = useSelector(kpiResultSelector);
  const getKPIResponse = useSelector(getResponseSelector);

  const get_historical_graph_data = useSelector(get_historical_graph_dataSelector);
  const kpiResult = get_historical_graph_data?.data || {};

  // const kpiResult =
  //   isModal || isReview
  //     ? getKPIResponse?.data?.Latest_Response?.data
  //     : kpiResultData?.data?.data || getKPIResponse?.data?.Latest_Response?.data;
  const [KPIList, setKPIList] = useState(null);
  const [activeKPI, setActiveKPI] = useState();
  const { width } = useWindowDimensions();
  const handleKPIClick = (id) => {
    setActiveKPI(id);
  };

  useEffect(() => {
    if (kpiResult) {
      setKPIList(Object.keys(kpiResult));
      const activeIdVal = Object.keys(kpiResult)[0];
      setActiveKPI(activeIdVal);
    }
  }, [kpiResult]);

  const data = convertData(activeKPI, kpiResult);
  const renderData =
    kpiResult && kpiResult[activeKPI]?.length
      ? Object.keys(kpiResult[activeKPI][0])?.filter((i) => {
          return !['L1_Threshold', 'L2_Threshold', 'L3_Threshold', 'name'].includes(i);
        })
      : [];

  // Get colors using randomColor function
  const [colors, setColors] = useState(randomColor(renderData?.length));
  useEffect(() => {
    if (renderData?.length != colors?.length) {
      setColors(randomColor(renderData?.length));
    }
  }, [renderData.length]);

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
            {renderData?.map((i, index) => (
              <Bar key={i} dataKey={i} barSize={20} fill={colors[index]?.hex || '#413ea0'} />
            ))}
            <Line type="monotone" dataKey="L1_Threshold" stroke="#ff7300" />
            <Line type="monotone" dataKey="L2_Threshold" stroke="#00FF00" />
            <Line type="monotone" dataKey="L3_Threshold" stroke="#ffc658" />
          </ComposedChart>
        </div>
        <div>
          <div className="renderBlockWrapper" style={{ minWidth: isModal ? 300 : 450 }}>
            <div className="chart-info-table overflow-table">
              <table className="w-full">
                <tr className="title-chart-ui">
                  <th>KPI ID</th>
                </tr>
              </table>
              <div className="table-responsive">
                <table className="w-full">
                  <tbody>
                    {KPIList?.map((list) => (
                      <tr key={list}>
                        <td>
                          <span
                            onClick={() => handleKPIClick(list)}
                            style={{
                              cursor: 'pointer',
                              color: list === activeKPI ? '#f1c40f' : '',
                            }}
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
        </div>
      </div>
    </>
  );
};

export default KIP_Graph_Section_2;
