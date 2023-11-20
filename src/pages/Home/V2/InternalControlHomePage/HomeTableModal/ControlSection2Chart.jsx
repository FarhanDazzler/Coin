import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { kpiResultSelector } from '../../../../../redux/Assessments/AssessmentSelectors';

const ControlSection2Chart = () => {
  const kpiResultData = useSelector(kpiResultSelector);
  const [series, setSeries] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [KPIList, setKPIList] = useState(null);
  const [activeKPI, setActiveKPI] = useState();
  const [activeKPIObj, setActiveKPIObj] = useState(null);

  useEffect(() => {
    if (kpiResultData?.data?.data) {
      setKPIList(Object.keys(kpiResultData?.data?.data));
      const activeIdVal = Object.keys(kpiResultData?.data?.data)[0];
      setActiveKPI(activeIdVal);
      setActiveKPIObj(kpiResultData?.data?.data[activeIdVal]);
    }
  }, [kpiResultData?.data]);

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
            xCategories.push(`${name} (${kpiId})`);
          });
        }
      });
      setXAxis(xCategories);

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
          Object.keys(country).map((name, i) => {
            values.push(+country[name]);
          });
          const data = xCategories.map((d, catIndex) => {
            return values[catIndex] || 0.1;
          });
          series.push({
            name: recKey,
            data,
          });
        });
      });
      setSeries(series);
    }
  }, [activeKPI]);

  const handleKPIClick = (id) => {
    setActiveKPI(id);
    setActiveKPIObj(kpiResultData?.data?.data[id]);
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

  return (
    <div className="d-flex">
      <div className="controlSection2ChartWrapper w-full">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {series.map((s) => {
            return (
              <span className="mr-3">
                {s.name.split('_')[0]} : {Math.max(...s.data)}
              </span>
            );
          })}
        </div>
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
