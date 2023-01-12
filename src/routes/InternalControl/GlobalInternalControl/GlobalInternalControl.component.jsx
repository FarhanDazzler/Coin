import { useMsal } from '@azure/msal-react';
//dummy data for the controls
let globalInternalControlTable = [
    {
      id: 1,
      Table_Header_1: 'Some_Data',
      Table_Header_2: 'Some_Data',
      Table_Header_3: 'Some_Data',
      Table_Header_4: 'Some_Data',
      Table_Header_5: 'Some_Data',
    },
    {
        id: 2,
        Table_Header_1: 'Some_Data',
        Table_Header_2: 'Some_Data',
        Table_Header_3: 'Some_Data',
        Table_Header_4: 'Some_Data',
        Table_Header_5: 'Some_Data',
      },
      {
        id: 3,
        Table_Header_1: 'Some_Data',
        Table_Header_2: 'Some_Data',
        Table_Header_3: 'Some_Data',
        Table_Header_4: 'Some_Data',
        Table_Header_5: 'Some_Data',
      },
  ];
  
const GlobalInternalControl = () => {
    
    const { accounts } = useMsal();

    const assessment_data_list = (data) =>
      data.map((item) => (
        <tr>
          <td>
            <a href={'/' + item.Table_Header_1}>{item.Table_Header_1}</a>
          </td>
          <td>{item.Table_Header_2}</td>
          <td>
              {item.Table_Header_3}
          </td>
          <td>
              {item.Table_Header_4}
          </td>
          <td>
              {item.Table_Header_5}
          </td>
        </tr>
      ));


    return(

    <div className="container mt-5">
      <div className="row">
        <div className="col col-lg-12">

        <div className="card">
              <div className="card-header">
                <div className="card-title">
                  {`Hi `}
                  <span className="golden-text">
                    <strong>
                      {accounts.length > 0 ? accounts[0].name : ''} {`!`}
                    </strong>
                  </span>
                </div>
              </div>
              <div className="card-title small m-1">
                <h4>{`You are an Internal Controller`}</h4>
              </div>
            </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">
                {`Hi  `}
                <span className="golden-text">{accounts[0].name ? accounts[0].name : ''}</span>
                {`!  You are an Internal Controller`}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title golden-text">
                <strong
                  style={{
                    fontSize: '1.3rem',
                  }}
                >
                  Global Internal Control
                </strong>
              </span>
            </div>
            <div className="card-body">
              {globalInternalControlTable.length !== 0 ? (
                <div className="table-responsive table-hover">
                  <table className="table table-outline text-wrap table-vcenter card-table">
                    <tr
                      className="text-center"
                      style={{
                        borderBottom: '2px solid black',
                      }}
                    >
                      <th>TABLE HEADER 1</th>
                      <th>TABLE HEADER 2</th>
                      <th>TABLE HEADER 3</th>
                      <th>TABLE HEADER 4</th>
                      <th>TABLE HEADER 5</th>
                    </tr>
                    <tbody
                      className="text-center"
                      style={{
                        backgroundColor: '#fff',
                      }}
                    >
                      {assessment_data_list(globalInternalControlTable)}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="card-body">No Data Available!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    );

};

export default GlobalInternalControl;