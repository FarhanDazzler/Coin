import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Badge, Box, Button, Flex, Menu, Text, Title, MantineProvider } from '@mantine/core';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
} from 'mantine-react-table';
import readXlsxFile from 'read-excel-file';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import Workbook from 'react-excel-workbook';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';

const Badge_apply = ({ data }) => {
  const colorMap = {
    PASS: 'green',
    FAIL: 'red',
    'N/A': 'gray',
    NA: 'gray',
  };

  const color = colorMap[data.toUpperCase()] || 'gray';

  return (
    <Badge color={color} size="lg" radius="lg" variant="outline">
      {data.toUpperCase()}
    </Badge>
  );
};

// Function to calculate the result based on the numerator, denominator, threshold, and positive direction
function calculateResult(numerator, denominator, threshold, positiveDirection) {
  if (threshold === null || threshold === '' || threshold === '-' || threshold === 'NA') {
    return 'N/A';
  }

  if (
    numerator === null ||
    numerator === '' ||
    numerator === 'NA' ||
    denominator === null ||
    denominator === '' ||
    denominator === 'NA'
  ) {
    return 'Fail';
  }

  let num, den, thresholdFloat;

  try {
    num = parseFloat(numerator);
    den = parseFloat(denominator);
    thresholdFloat = parseFloat(threshold);
  } catch (error) {
    console.log('Error: One of the inputs is not a valid float.');
    return 'Fail';
  }

  if (isNaN(num) || isNaN(den) || isNaN(thresholdFloat)) {
    console.log('Error: One of the inputs is not a valid float.');
    return 'Fail';
  }

  if (den === 0) {
    return 'Fail'; // Only denominator is zero
  }

  const value = num / den;
  if (positiveDirection && positiveDirection.trim().toLowerCase() === 'lower is better') {
    return value <= thresholdFloat ? 'Pass' : 'Fail';
  } else if (positiveDirection && positiveDirection.trim().toLowerCase() === 'higher is better') {
    return value >= thresholdFloat ? 'Pass' : 'Fail';
  } else {
    return 'Fail';
  }
}

const KPITable = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Zone',
        filterVariant: 'multi-select',
        header: 'Zone',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Entity',
        enableClickToCopy: true,
        filterVariant: 'multi-select',
        header: 'Entity',
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: 'provider',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Provider',
        size: 300,
        enableEditing: false,
      },
      {
        accessorKey: 'CONTROL_ID',
        enableClickToCopy: true,
        filterVariant: 'multi-select',
        header: 'Control ID',
        size: 200,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'control_NAME',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Control Name',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'kpi_type',
        enableClickToCopy: true,
        filterVariant: 'multi-select',
        header: 'KPI Type',
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: 'Expected_Source',
        enableClickToCopy: true,
        filterVariant: 'multi-select',
        header: 'Expected Source',
        size: 100,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        // Cell: ({ row }) => (
        //   <Button onClick={() => sendEmail(row.original.Expected_Source)}>Send Email</Button>
        // ),
        Cell: ({ cell }) => <span>{cell.getValue() == 'Manual' ? 'Manual' : 'Automated'}</span>,
      },
      {
        accessorKey: 'KPI_CODE',
        enableClickToCopy: true,
        filterVariant: 'multi-select',
        header: 'KPI ID',
        size: 100,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'KPI_NAME',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Name',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'applicable',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Applicability',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'Month',
        filterVariant: 'multi-select',
        header: 'Month',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'expected_num',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Expected Num',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'expected_den',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Expected Den',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'KPI_Num',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Num',
        size: 100,
        mantineEditTextInputProps: ({ cell, row }) => ({
          required: true,
          type: 'number',
          variant: 'filled',
          error: validationErrors[row.original.id]?.KPI_Num,
          helperText: validationErrors[row.original.id]?.KPI_Num,
          onBlur: (event) => {
            // console.log('@@', row.original.id);
            const value = event.target.value;
            tableData[cell.row.index][cell.column.id] = value;
            // setTableData([...tableData]);
            // setting up results here based on the numerator, denominator, threshold, and positive direction
            tableData[cell.row.index].Result_L1 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L1,
              row.original.Direction,
            );
            tableData[cell.row.index].Result_L2 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L2,
              row.original.Direction,
            );
            tableData[cell.row.index].Result_L3 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L3,
              row.original.Direction,
            );

            //validation logic
            if (!value) {
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Num: 'Numerator is required',
                },
              }));
            } else if (value < 0) {
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Num: 'Numerator can be positive values only',
                },
              }));
            } else if (!row.original.KPI_Den) {
              // console.log('@@', row);
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Num: 'Denominator is required',
                },
              }));
            } else {
              delete validationErrors[row.original.id]?.KPI_Num;
              setValidationErrors({ ...validationErrors });
              if (
                row.original.KPI_Den &&
                validationErrors[row.original.id]?.KPI_Den == 'Numerator is required'
              ) {
                delete validationErrors[row.original.id]?.KPI_Den;
                setValidationErrors({ ...validationErrors });
              }
            }
          },
        }),
      },
      {
        accessorKey: 'KPI_Den',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Den',
        size: 100,
        mantineEditTextInputProps: ({ cell, row }) => ({
          required: true,
          type: 'number',
          variant: 'filled',
          error: validationErrors[row.original.id]?.KPI_Den,
          helperText: validationErrors[row.original.id]?.KPI_Den,
          onBlur: (event) => {
            const value = event.target.value;
            tableData[cell.row.index][cell.column.id] = value;

            // setting up results here based on the numerator, denominator, threshold, and positive direction
            tableData[cell.row.index].Result_L1 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L1,
              row.original.Direction,
            );
            tableData[cell.row.index].Result_L2 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L2,
              row.original.Direction,
            );
            tableData[cell.row.index].Result_L3 = calculateResult(
              row.original.KPI_Num,
              row.original.KPI_Den,
              row.original.L3,
              row.original.Direction,
            );
            // console.log(
            //   '@@',
            //   calculateResult(
            //     row.original.KPI_Num,
            //     row.original.KPI_Den,
            //     row.original.L3,
            //     row.original.Direction,
            //   ),
            // );
            // console.log('@@@', cell);

            //validation logic
            if (!value) {
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Den: 'Denominator is required',
                },
              }));
            } else if (value <= 0) {
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Den: 'Denominator can be positive values only',
                },
              }));
            } else if (!row.original.KPI_Num) {
              // console.log('##', row);
              setValidationErrors((prev) => ({
                ...prev,
                [row.original.id]: {
                  ...prev[row.original.id],
                  KPI_Den: 'Numerator is required',
                },
              }));
            } else {
              delete validationErrors[row.original.id]?.KPI_Den;
              setValidationErrors({ ...validationErrors });

              if (
                row.original.KPI_Num &&
                validationErrors[row.original.id]?.KPI_Num == 'Denominator is required'
              ) {
                delete validationErrors[row.original.id]?.KPI_Num;
                setValidationErrors({ ...validationErrors });
              }
            }
          },
        }),
      },
      {
        accessorKey: 'KPI_Value',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Value',
        size: 100,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        enableEditing: false,
      },
      {
        accessorKey: 'expected_kpi_source',
        header: 'Expected KPI Source',
        size: 100,
        editVariant: 'select',
        mantineEditSelectProps: ({ cell, row }) => ({
          data: [
            {
              value: 'Automated',
              label: 'Automated',
            },
            {
              value: 'Manual',
              label: 'Manual',
            },
          ],
          onChange: (value) => (tableData[cell.row.index][cell.column.id] = value),
        }),
      },
      {
        accessorKey: 'upload_approach',
        header: 'Actual KPI Source',
        size: 100,
        editVariant: 'select',
        mantineEditSelectProps: ({ cell, row }) => ({
          data: [
            {
              value: 'Excel',
              label: 'Excel',
            },
            {
              value: 'PBI',
              label: 'PBI',
            },
            {
              value: 'Celonis',
              label: 'Celonis',
            },
            {
              value: 'Others',
              label: 'Others',
            },
          ],
          onChange: (value) => (tableData[cell.row.index][cell.column.id] = value),
        }),
      },
      {
        accessorKey: 'source_system',
        enableClickToCopy: true,
        header: 'Source of Data - Link',
        size: 300,
        mantineEditTextInputProps: ({ cell, row }) => ({
          required: false,
          type: 'text',
          variant: 'filled',
          onBlur: (event) => {
            const value = event.target.value;
            tableData[cell.row.index][cell.column.id] = value;
            // setTableData([...tableData]);
          },
        }),
      },
      {
        accessorKey: 'kpi_desc',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Description',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'L1',
        // filterVariant: 'autocomplete',
        header: 'Threshold L1',
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: 'L2',
        // filterVariant: 'autocomplete',
        header: 'Threshold L2',
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: 'L3',
        // filterVariant: 'autocomplete',
        header: 'Threshold L3',
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: 'Result_L1',
        //   filterVariant: 'autocomplete',
        header: 'Result L1',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => <Badge_apply data={cell.getValue()} />,
        // Cell: ({ row }) => {
        //   return <Badge_apply data={row.original.Result_L1} />;
        // },
      },
      {
        accessorKey: 'Result_L2',
        //   filterVariant: 'autocomplete',
        header: 'Result L2',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => <Badge_apply data={cell.getValue()} />,
      },
      {
        accessorKey: 'Result_L3',
        //   filterVariant: 'autocomplete',
        header: 'Result L3',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => <Badge_apply data={cell.getValue()} />,
      },
      {
        accessorKey: 'kpi_owner_email',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'KPI Owner Email',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'control_owner_email',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Control Owner Email',
        size: 200,
        enableEditing: false,
      },
      {
        accessorKey: 'control_oversight_email',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Control Oversight Email',
        size: 300,
        enableEditing: false,
      },
      // {
      //   accessorKey: 'Direction',
      //   enableClickToCopy: true,
      //   //   filterVariant: 'autocomplete',
      //   header: 'Direction',
      //   size: 300,
      //   enableEditing: false,
      // },
      {
        accessorKey: 'load_date',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Load Date',
        size: 300,
        enableEditing: false,
      },
      {
        accessorKey: 'year_and_quarter',
        enableClickToCopy: true,
        //   filterVariant: 'autocomplete',
        header: 'Year and Quarter',
        size: 50,
        enableEditing: false,
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
    ],
    [validationErrors, tableData],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (excelFile !== null) {
    //   document.getElementById('combine_btn').reset();

    //   var myHeaders = new Headers();
    //   myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
    //   myHeaders.append('Content-Type', 'application/json');

    //   var apiBody = {
    //     input_table: tableData,
    //     output_table: excelFile,
    //   };
    //   console.log(excelFile);
    //   dispatch(getCsvTampredDataAction(apiBody));
    //   if (stateCsvTampred?.data === false) {
    //     // let newDataArray = tableData?.map((data, i) => {
    //     //   return {
    //     //     ...data,
    //     //     Numerator: excelFile[i]?.Numerator,
    //     //     Denominator: excelFile[i]?.Denominator,
    //     //     Upload_Approach: excelFile[i]['KPI Data source (Select from Excel/PBI/Celonis/Others)'],
    //     //     Source_System: excelFile[i]['Link to data'],
    //     //   };
    //     // });
    //     // console.log(newDataArray, 'newDataArray');
    //     // setTableData([...newDataArray]);
    //     // setScvUpdateData(csvUpdateData + 1);
    //   } else {
    //     setScvUpdateData(0);
    //   }
    // } else {
    //   setTableData(null);
    // }
  };
  const handleFile = (e) => {
    // let selectedFile = e.target.files[0];
    // if (selectedFile) {
    //   if (selectedFile) {
    //     readXlsxFile(selectedFile).then((data) => {
    //       setExcelFile(
    //         data.slice(1).map((d) => {
    //           let obj = {};
    //           d.map((v, i) => {
    //             obj[data[0][i]] = v;
    //           });
    //           return obj;
    //         }),
    //       );
    //     });
    //   } else {
    //     setExcelFile(null);
    //   }
    // } else {
    //   // console.log('plz select your file');
    // }
  };

  const handleSaveKPIData = () => {
    // checking if there are any validation errors before sending the data to the api for saving the data
    // if there are no validation errors then send the data to the api for saving the data
    // else show the validation errors to the user

    // {Object.values(validationErrors).some(
    //   (error) => error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
    // ) && <Text color="red">Fix errors before submitting</Text>}

    if (
      Object.keys(tableData).length === 0 ||
      Object.values(validationErrors).some(
        (error) => error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
      )
    ) {
      toast.error('Please fill all the required fields and fix the errors before submitting.');
      return;
    } else {
      console.log('Saved data', tableData);
    }
  };

  const handleShowResults = () => {
    // updating setTableData with all user input added directly to tableData via table.
    // Crated this functionality to stopping re-rendering of table on every cell change.
    // This will update the tableData with all the user input added directly to tableData via table.
    setTableData([...tableData]);
  };

  console.log('tableData', tableData);
  console.log('validationErrors', validationErrors);

  return (
    <div className="kpi_table">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <MantineReactTable
          columns={columns}
          data={tableData}
          enableColumnFilterModes={false}
          enableFacetedValues={true}
          enableGrouping={false}
          // enablePinning= {true}
          enableRowSelection={false}
          selectAllMode="all"
          getRowId={(row) => row.id}
          paginationDisplayMode={'pages'}
          enableRowNumbers={true}
          rowNumberMode={'original'}
          // positionToolbarAlertBanner= {'bottom'}
          enableStickyHeader={true}
          // createDisplayMode="row" // ('modal', and 'custom' are also available)
          editDisplayMode="table" // ('modal', 'row', 'cell', and 'custom' are also available)
          enableEditing={(row) => row.original.Expected_Source == 'Manual'}
          initialState={{
            showColumnFilters: true,
            showGlobalFilter: true,
            density: 'xs',
            expanded: true,
            grouping: ['state'],
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'state', desc: false }],
          }}
          mantinePaginationProps={{
            radius: 'xl',
            size: 'lg',
          }}
          mantineTableHeadCellProps={{
            align: 'center',
          }}
          displayColumnDefOptions={{
            'mrt-row-numbers': {
              size: 10,
            },
            'mrt-row-expand': {
              size: 10,
            },
          }}
          mantineTableProps={{
            //   highlightOnHover: false,
            withColumnBorders: true,
            //   sx: {
            //     'thead > tr': {
            //       backgroundColor: 'inherit',
            //     },
            //     // 'thead > tr > th': {
            //     //   backgroundColor: 'inherit',
            //     // },
            //     'tbody > tr > td': {
            //       backgroundColor: 'inherit',
            //     },
            //   },
          }}
          renderTopToolbar={({ table }) => {
            return (
              <Flex p="md" justify="space-between" className="kpi_module_buttons">
                <Flex align="center" gap="xs">
                  <button
                    className="custom-btn mt-2 submit-btn"
                    onClick={() => {
                      handleShowResults();
                    }}
                  >
                    Show Results
                  </button>
                  <button
                    className="custom-btn mt-2 submit-btn"
                    onClick={handleSaveKPIData}
                    // disabled={
                    //   Object.keys(tableData).length === 0 ||
                    //   Object.values(validationErrors).some(
                    //     (error) =>
                    //       error.hasOwnProperty('KPI_Num') || error.hasOwnProperty('KPI_Den'),
                    //   )
                    // }
                  >
                    Submit KPIs
                  </button>
                  {/* <div className="row kpi_table_row" id="export_button_right">
                    <Workbook
                      filename={`data.xlsx`}
                      element={
                        <button className="custom-btn mt-2 submit-btn">
                          {t('selfAssessment.assessmentForm.exportToExcel')}
                        </button>
                      }
                    >
                      <Workbook.Sheet data={data} name="Sheet A">
                        <Workbook.Column label="Global_KPI_Code" value="firstName" />
                        <Workbook.Column label="Applicability" value="Applicability" />
                        <Workbook.Column label="Entity_ID" value="Entity_ID" />
                        <Workbook.Column label="Expected_Numerator" value="Expected_Numerator" />
                        <Workbook.Column label="Numerator" value="Numerator" />
                        <Workbook.Column
                          label="Expected_Denominator"
                          value="Expected_Denominator"
                        />
                        <Workbook.Column label="Denominator" value="Denominator" />
                        <Workbook.Column label="Type_of_KPI" value="Type_of_KPI" />
                        <Workbook.Column label="Month" value="Month" />
                        <Workbook.Column
                          label="KPI Data source (Select from Excel/PBI/Celonis/Others)"
                          value="Upload_Approach"
                        />
                        <Workbook.Column label="Link to data" value="Source_System" />
                        <Workbook.Column label="L1_Result" value="L1_Result" />
                        <Workbook.Column label="L2_Result" value="L2_Result" />
                        <Workbook.Column label="L3_Result" value="L3_Result" />
                      </Workbook.Sheet>
                    </Workbook>
                  </div>

                  <form onSubmit={handleSubmit} id="combine_btn" className="kpi_module_form mt-1">
                    <div className="d-flex align-items-center">
                      <div className="mt-2">
                        <label htmlFor="uploadfile" className="file-input">
                          <input
                            type="file"
                            placeholder="Name"
                            id="uploadfile"
                            onChange={handleFile}
                          />
                          <div className="custom-btn choose-file">Choose File</div>
                        </label>
                      </div>

                      <button type="submit" className="custom-btn upload-btn" disabled={!excelFile}>
                        Upload
                      </button>
                    </div>
                  </form> */}
                </Flex>
                <Flex gap="xs">
                  <MRT_GlobalFilterTextInput table={table} />
                  <MRT_ToggleFiltersButton table={table} />
                  <MRT_ShowHideColumnsButton table={table} />
                  <MRT_ToggleDensePaddingButton table={table} />
                </Flex>
              </Flex>
            );
          }}
        />
      </MantineProvider>
    </div>
  );
};

export default KPITable;
