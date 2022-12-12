import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import DataAccordion from '../../common/DataAccordion';

//variables from global controls and local control descriptions.
var Global_data = [];
var Global_Data = [];
var L1_desc = {};
var L2_desc = {};

let data_loaded = false;

const SpinningLoader = [
  <div
    className="spinner-loader"
    style={{
      color: 'gold',
      margin: '10px',
      padding: '15px',
    }}
  >
    <strong>Please wait while the details are loaded...</strong>
  </div>,
];

var local_control_description_fromDB = '';
var control_name_fromDB = '';
var control_oversight_fromDB = '';

const Details = ({ control_id }) => {
  // const control_id = 'ATR_ACCR_01a';

  const getControlData = () => {
    //for LCD and other details
    Axios.get('http://localhost:1234/get_control_instances?ControlID=' + control_id).then(function (
      response,
    ) {
      console.log(response);
      var status_code = response.status;
      var status_text = response.statusText;
      var api_data = response?.data.data;

      console.log(api_data);

      var lcd_desc = '';
      var control_oversight = '';
      var control_name = '';

      if (api_data.length !== 0) {
        api_data = api_data[0];
        lcd_desc = api_data.local_control_description;
        control_oversight = api_data.coversight;
        control_name = api_data.control_id_provider_entity;
      } else {
        control_oversight = 'No Data Available';
        control_name = 'No Data Available';
      }

      if (status_code === 200 && status_text === 'OK') {
        if (lcd_desc) {
          local_control_description_fromDB = lcd_desc;
        } else {
          local_control_description_fromDB = 'No local description available for this control';
        }
        control_oversight_fromDB = control_oversight ? control_oversight.split('@')[0] : '';
        control_name_fromDB = control_name;
        data_loaded = true;
      } else {
        console.log(response.error.message);
      }
    });
  };

  //load GCD data from backend
  const getGCDDesc = () => {
    //for GCD
    Axios.get('http://localhost:1234/get_mics_framework_details?ControlID=' + control_id).then(
      function (response) {
        var status_code = response.status;
        var status_text = response.statusText;
        var api_data = response?.data.data[0];

        if (api_data) {
          var L1Data = '';
          var L2Data = '';
          if (api_data.mics_L1desc.length === 0) {
            L1Data = 'Not Specified';
          } else {
            L1Data = api_data.mics_L1desc;
          }
          if (api_data.mics_L2desc.length === 0) {
            L2Data = 'Not Specified';
          } else {
            L2Data = api_data.mics_L2desc;
          }
          L1_desc['key'] = '1';
          L1_desc['header'] =
            'MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes (External Compliance)';
          L1_desc['text'] = L1Data;
          L2_desc['key'] = '2';
          L2_desc['header'] =
            'MICS L2 - Minimal Requirements To Avoid Surprises (Internal Compliance)';
          L2_desc['text'] = L2Data;
        } else {
          L1_desc['key'] = '1';
          L1_desc['header'] =
            'MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes (External Compliance)';
          L1_desc['text'] = 'Not Specified';
          L2_desc['key'] = '2';
          L2_desc['header'] =
            'MICS L2 - Minimal Requirements To Avoid Surprises (Internal Compliance)';
          L2_desc['text'] = 'Not Specified';
        }
        Global_Data[0] = L1_desc;
        Global_Data[1] = L2_desc;

        if (status_code === 200 && status_text === 'OK') {
          Global_data = Global_Data;
        } else {
          console.log(response.error.message);
        }
      },
    );
  };

  useEffect(() => {
    getControlData();
    getGCDDesc();
  }, []);

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 1) : text}
        <strong>
          <span onClick={toggleReadMore} className="golden-text read-or-hide">
            {isReadMore ? '...Show more' : ' Show less'}
          </span>
        </strong>
      </p>
    );
  };

  return (
    <>
      <div className="container">
        <div className="">
          <div className="card mb-1">
            <div className="card-header">
              <h2
                className="card-title golden-text"
                style={{
                  fontSize: '1.3rem',
                }}
              >
                <strong>
                  {control_id} <span className="black-text"> - Manual Journal Entries - ERP </span>
                </strong>
              </h2>
            </div>
            <DataAccordion
              acc_key="0"
              acc_header="Global Control Description (GCD)"
              acc_body={
                <ReadMore>
                  {Global_data.map((comp) => {
                    return (
                      <div>
                        <p className="black-text">
                          <strong>{comp.header}</strong>
                        </p>
                        <p>{comp.text}</p>
                      </div>
                    );
                  })}
                </ReadMore>
              }
              // acc_body={Global_data.map((comp) => {
              //   return (
              //     <div>
              //       <p className="black-text">
              //         <strong>{comp.header}</strong>
              //       </p>
              //       <ReadMore>
              //         {comp.text.split('. ').map((str, index) => (
              //           <p key={index}>{str}<br/></p>
              //         ))}
              //       </ReadMore>
              //     </div>
              //   );
              // })}
            />
            <DataAccordion
              acc_key="1"
              acc_header="Local Control Description (LCD)"
              acc_body={local_control_description_fromDB}
            />
            <DataAccordion
              acc_key="1"
              acc_header="SCOPE"
              acc_body={
                <div>
                  <p>Receving entity : </p>
                  <p>Provider org: </p>
                  <p>Period of assessment</p>
                  <p>Frequency of control : </p>
                </div>
              }
            />
            {data_loaded ? (
              <div className="card-body p-4">
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Control Name: </span>
                  {control_name_fromDB}
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Control Oversight:</span>{' '}
                  {control_oversight_fromDB}
                </p>
                <p>
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>Assessment Period:</span>{' '}
                  {Math.floor(new Date().getMonth() / 3 + 1)}
                  {`Q`} {new Date().getFullYear()}{' '}
                </p>
              </div>
            ) : (
              SpinningLoader
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
