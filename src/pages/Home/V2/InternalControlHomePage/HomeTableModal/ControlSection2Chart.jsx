import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import {
  getResponseSelector,
  kpiResultSelector,
} from '../../../../../redux/Assessments/AssessmentSelectors';

const ControlSection2Chart = ({ isModal }) => {
  const kpiResultData = useSelector(kpiResultSelector);
  const getKPIResponse = useSelector(getResponseSelector);
  const kpiResult = isModal
    ? getKPIResponse?.data?.Latest_Response?.data
    : kpiResultData?.data?.data;
  const [series, setSeries] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [KPIList, setKPIList] = useState(null);
  const [activeKPI, setActiveKPI] = useState();
  const [activeKPIObj, setActiveKPIObj] = useState(null);

  useEffect(() => {
    if (kpiResult) {
      setKPIList(Object.keys(kpiResult));
      const activeIdVal = Object.keys(kpiResult)[0];
      setActiveKPI(activeIdVal);
      setActiveKPIObj(kpiResult[activeIdVal]);
    }
  }, [kpiResultData?.data]);

  function compareMonths(a, b) {
    const monthOrder = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const aValue = a.split('_')[0];
    const bValue = b.split('_')[0];
    return monthOrder.indexOf(aValue) - monthOrder.indexOf(bValue);
  }

  useEffect(() => {
    if (activeKPI) {
      const kpiData = activeKPIObj;
      const kpiId = activeKPI;
      const series = [];
      const xCategories = [];
      const receivers = kpiData.receivers;
      Object.keys(receivers).map((recKey, i) => {
        const country = receivers[recKey];
        if (i === 0) {
          Object.keys(country).map((name) => {
            xCategories.push(name);
          });
        }
      });
      setXAxis(xCategories?.sort(compareMonths));

      [kpiId].map((kpiId, kpiIndex) => {
        const receivers = kpiData.receivers;
        Object.keys(receivers).map((recKey, i) => {
          const country = receivers[recKey];
          const values = [];
          if (kpiIndex) {
            const indexVal = kpiIndex * Object.keys(country).length - 1;
            for (let i = 0; i <= indexVal; i++) {
              values.push(0);
            }
          }
          Object.keys(country)
            .sort(compareMonths)
            .map((name, i) => {
              values.push(+country[name]);
            });
          const data = xCategories.map((d, catIndex) => {
            return values[catIndex] || 0;
          });
          series.push({
            name: recKey,
            type: i === 0 ? 'area' : 'column',
            data,
          });
        });
      });
      setSeries(series);
    }
  }, [activeKPI]);

  const handleKPIClick = (id) => {
    setActiveKPI(id);
    if (kpiResult) setActiveKPIObj(kpiResult[id]);
  };

  const yaxis = useMemo(() => {
    if (series.length > 0) {
      const allValMax = series.map((s) => {
        return Math.max(...s.data.map((d) => +d));
      });
      const allValMin = series.map((s) => {
        return Math.min(...s.data.map((d) => +d));
      });

      return {
        min: Math.min(...allValMin) - 20,
        max: Math.max(...allValMax) + 2,
      };
    }
    return {};
  }, [series]);

  const thresholds = useMemo(() => {
    if (activeKPIObj) {
      return Object.keys(activeKPIObj.thresholds).map((key) => {
        return { name: key, value: activeKPIObj.thresholds[key] };
      });
    }
    return [];
  }, [activeKPIObj]);
  return (
    <div className="d-flex">
      <div className="controlSection2ChartWrapper w-full">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 15px' }}>
          {thresholds.map((s) => {
            return (
              <span className="mr-3 font-weight-bold">
                {s.name.split('_').join(' ')}: {s.value}
              </span>
            );
          })}
        </div>
        <div className="chart-wrapper">
          <div className="axis y-axis">KPI Values</div>
          <div className="axis x-axis mb-2">Receivers</div>
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
              yaxis,
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
                    return val || '0';
                  },
                },
              },
            }}
            series={series}
            height={350}
          />
        </div>
      </div>
      <div className="renderBlockWrapper" style={{ minWidth: 350 }}>
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
  );
};

export default ControlSection2Chart;
