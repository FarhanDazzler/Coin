import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
} from 'mantine-react-table';
import readXlsxFile from 'read-excel-file';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import { Badge, Box, Button, Flex, Menu, Text, Title, MantineProvider } from '@mantine/core';
import Workbook from 'react-excel-workbook';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';

const Badge_apply = ({ data }) => {
  if (data.toUpperCase() === 'PASS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'FAIL') {
    return (
      <Badge color="red" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'N/A' || data.toUpperCase() === 'NA') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
};

const KPITable = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);

  const columns = [
    //   {
    //     accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
    //     id: 'name', //id is still required when using accessorFn instead of accessorKey
    //     header: 'Name',
    //     size: 250,
    //     filterVariant: 'autocomplete',
    //     Cell: ({ renderedCellValue, row }) => (
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           gap: '16px',
    //         }}
    //       >
    //         <img
    //           alt="avatar"
    //           height={30}
    //           src={row.original.avatar}
    //           style={{ borderRadius: '50%' }}
    //         />
    //         <span>{renderedCellValue}</span>
    //       </Box>
    //     ),
    //   },
    //   {
    //     accessorKey: 'jobTitle', //hey a simple column for once
    //     header: 'Job Title',
    //     filterVariant: 'multi-select',
    //     size: 350,
    //   },
    {
      accessorKey: 'Zone',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Zone',
      size: 50,
      enableEditing: false,
      mantineTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'applicable',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Applicability',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'CONTROL_ID',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
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
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'KPI_CODE',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Code',
      size: 200,
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
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'Expected_Source',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Type',
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
      accessorKey: 'Entity',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Entity',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'BU',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'BU',
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
      accessorKey: 'expected_num',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Num',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'KPI_Num',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Num',
      size: 100,
      mantineEditTextInputProps: {
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors.KPI_Num,
        onChange: (event) => {
          const value = event.target.value;
          //validation logic
          if (!value) {
            setValidationErrors((prev) => ({ ...prev, KPI_Num: 'Numerator is required' }));
          } else if (value < 0) {
            setValidationErrors({
              ...validationErrors,
              KPI_Num: 'Numerator can be positive values only',
            });
          } else {
            delete validationErrors.KPI_Num;
            setValidationErrors({ ...validationErrors });
          }
        },
      },
    },
    {
      accessorKey: 'expected_den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Den',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'KPI_Den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Den',
      size: 100,
      mantineEditTextInputProps: {
        required: true,
        type: 'number',
        variant: 'filled',
        error: validationErrors.KPI_Den,
        onChange: (event) => {
          const value = event.target.value;
          //validation logic
          if (!value) {
            setValidationErrors((prev) => ({ ...prev, KPI_Den: 'Denominator is required' }));
          } else if (value <= 0) {
            setValidationErrors({
              ...validationErrors,
              KPI_Den: 'Denominator can be positive values only',
            });
          } else {
            delete validationErrors.KPI_Den;
            setValidationErrors({ ...validationErrors });
          }
        },
      },
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
    // {
    //   accessorKey: 'L1',
    //   enableClickToCopy: true,
    //   // filterVariant: 'autocomplete',
    //   header: 'L1',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'L2',
    //   enableClickToCopy: true,
    //   // filterVariant: 'autocomplete',
    //   header: 'L2',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'L3',
    //   enableClickToCopy: true,
    //   // filterVariant: 'autocomplete',
    //   header: 'L3',
    //   size: 300,
    // },
    {
      accessorKey: 'Month',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Month',
      size: 100,
      enableEditing: false,
      mantineTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'Result_L1',
      enableClickToCopy: true,
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
      enableClickToCopy: true,
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
      enableClickToCopy: true,
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
      accessorKey: 'upload_approach',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Upload Approach',
      size: 300,
      editVariant: 'select',
      mantineTableBodyCellProps: {
        align: 'center',
      },
      mantineEditSelectProps: {
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
      },
    },
    {
      accessorKey: 'source_system',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Source of Data - Link',
      size: 300,
    },
    {
      accessorKey: 'Source_Details',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Source Details',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'calculation_source',
      enableClickToCopy: true,
      // filterVariant: 'autocomplete',
      header: 'Calculation Source',
      size: 300,
      enableEditing: false,
    },
    // {
    //   accessorKey: 'control_oversight_email',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'Control Oversight Email',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'control_oversight_oid',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'Control Oversight OID',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'control_owner_email',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'Control Owner Email',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'control_owner_oid',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'Control Owner OID',
    //   size: 300,
    // },
    {
      accessorKey: 'entity_type',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Entity Type',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'expected_kpi_source',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected KPI Source',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'kpi_desc',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Description',
      size: 300,
      enableEditing: false,
    },
    // {
    //   accessorKey: 'kpi_owner_email',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'KPI Owner Email',
    //   size: 300,
    // },
    // {
    //   accessorKey: 'kpi_owner_oid',
    //   enableClickToCopy: true,
    //   //   filterVariant: 'autocomplete',
    //   header: 'KPI Owner OID',
    //   size: 300,
    // },
    {
      accessorKey: 'kpi_type',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Type',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'load_date',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Load Date',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'mega_process',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Mega Process',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'sub_process',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Sub Process',
      size: 300,
      enableEditing: false,
      mantineTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'period_from',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Period From',
      size: 300,
      enableEditing: false,
    },
    {
      accessorKey: 'period_to',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Period To',
      size: 300,
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
      accessorKey: 'uploader',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Uploader',
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
  ];

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

  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    tableData[cell.row.index][cell.column.id] = value;
    //send/receive api updates here
    setTableData([...tableData]); //re-render with new data
  };

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
          paginationDisplayMode={'pages'}
          enableRowNumbers={true}
          rowNumberMode={'original'}
          // positionToolbarAlertBanner= {'bottom'}
          enableStickyHeader={true}
          createDisplayMode="row" // ('modal', and 'custom' are also available)
          editDisplayMode="table" // ('modal', 'row', 'cell', and 'custom' are also available)
          enableEditing={(row) => row.original.Expected_Source == 'Manual'}
          mantineEditTextInputProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onBlur: (event) => {
              handleSaveCell(cell, event.target.value);
            },
            variant: 'unstyled', //default for editDisplayMode="table"
          })}
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
                <Flex sx={{ gap: '8px' }}>
                  <button className="custom-btn mt-2 submit-btn">Submit</button>
                  {/* <div className="row kpi_table_row" id="export_button_right">
              <Workbook
              filename={`data.xlsx`}
              element={
                <button className="custom-btn mt-2">
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
                <Workbook.Column label="Expected_Denominator" value="Expected_Denominator" />
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

            <form onSubmit={handleSubmit} id="combine_btn" className="kpi_module_form">
              <div className="d-flex align-items-center">
                <div className="mt-2">
                  <label htmlFor="uploadfile" className="file-input">
                    <input type="file" placeholder="Name" id="uploadfile" onChange={handleFile} />
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
