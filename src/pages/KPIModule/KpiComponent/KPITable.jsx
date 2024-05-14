import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
} from 'mantine-react-table';
import readXlsxFile from 'read-excel-file';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import { Box, Button, Flex, Menu, Text, Title, MantineProvider } from '@mantine/core';
import Workbook from 'react-excel-workbook';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';

const KPITable = ({ tableData }) => {
  const { t } = useTranslation();
  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState(tableData);

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
      accessorKey: 'Applicability',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Applicability',
      size: 300,
    },
    {
      accessorKey: 'BU',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'BU',
      size: 300,
    },
    {
      accessorKey: 'CONTROL_ID',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control ID',
      size: 300,
    },
    {
      accessorKey: 'Direction',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Direction',
      size: 300,
    },
    {
      accessorKey: 'Entity',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Entity',
      size: 300,
    },
    {
      accessorKey: 'Expected_Source',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Source',
      size: 300,
    },
    {
      accessorKey: 'KPI_CODE',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Code',
      size: 300,
    },
    {
      accessorKey: 'KPI_Den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Den',
      size: 300,
    },
    {
      accessorKey: 'KPI_NAME',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Name',
      size: 300,
    },
    {
      accessorKey: 'KPI_Num',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Num',
      size: 300,
    },
    {
      accessorKey: 'KPI_Value',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Value',
      size: 300,
    },
    {
      accessorKey: 'L1',
      enableClickToCopy: true,
      // filterVariant: 'autocomplete',
      header: 'L1',
      size: 300,
    },
    {
      accessorKey: 'L2',
      enableClickToCopy: true,
      // filterVariant: 'autocomplete',
      header: 'L2',
      size: 300,
    },
    {
      accessorKey: 'L3',
      enableClickToCopy: true,
      // filterVariant: 'autocomplete',
      header: 'L3',
      size: 300,
    },
    {
      accessorKey: 'Month',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Month',
      size: 300,
    },
    {
      accessorKey: 'Result_L1',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Result L1',
      size: 300,
    },
    {
      accessorKey: 'Result_L2',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Result L2',
      size: 300,
    },
    {
      accessorKey: 'Result_L3',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Result L3',
      size: 300,
    },
    {
      accessorKey: 'Source_Details',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Source Details',
      size: 300,
    },
    {
      accessorKey: 'Zone',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Zone',
      size: 300,
    },
    {
      accessorKey: 'applicable',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Applicable',
      size: 300,
    },
    {
      accessorKey: 'calculation_source',
      enableClickToCopy: true,
      // filterVariant: 'autocomplete',
      header: 'Calculation Source',
      size: 300,
    },
    {
      accessorKey: 'control_NAME',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Name',
      size: 300,
    },
    {
      accessorKey: 'control_oversight_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Oversight Email',
      size: 300,
    },
    {
      accessorKey: 'control_oversight_oid',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Oversight OID',
      size: 300,
    },
    {
      accessorKey: 'control_owner_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Owner Email',
      size: 300,
    },
    {
      accessorKey: 'control_owner_oid',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Control Owner OID',
      size: 300,
    },
    {
      accessorKey: 'entity_type',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Entity Type',
      size: 300,
    },
    {
      accessorKey: 'expected_den',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Den',
      size: 300,
    },
    {
      accessorKey: 'expected_kpi_source',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected KPI Source',
      size: 300,
    },
    {
      accessorKey: 'expected_num',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Expected Num',
      size: 300,
    },
    {
      accessorKey: 'kpi_desc',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Description',
      size: 300,
    },
    {
      accessorKey: 'kpi_owner_email',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Owner Email',
      size: 300,
    },
    {
      accessorKey: 'kpi_owner_oid',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Owner OID',
      size: 300,
    },
    {
      accessorKey: 'kpi_type',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'KPI Type',
      size: 300,
    },
    {
      accessorKey: 'load_date',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Load Date',
      size: 300,
    },
    {
      accessorKey: 'mega_process',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Mega Process',
      size: 300,
    },
    {
      accessorKey: 'period_from',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Period From',
      size: 300,
    },
    {
      accessorKey: 'period_to',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Period To',
      size: 300,
    },
    {
      accessorKey: 'provider',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Provider',
      size: 300,
    },
    {
      accessorKey: 'source_system',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Source System',
      size: 300,
    },
    {
      accessorKey: 'sub_process',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Sub Process',
      size: 300,
    },
    {
      accessorKey: 'upload_approach',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Upload Approach',
      size: 300,
    },
    {
      accessorKey: 'uploader',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Uploader',
      size: 300,
    },
    {
      accessorKey: 'year_and_quarter',
      enableClickToCopy: true,
      //   filterVariant: 'autocomplete',
      header: 'Year and Quarter',
      size: 300,
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

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableFacetedValues: true,
    enableGrouping: false,
    enablePinning: true,
    enableRowSelection: false,
    paginationDisplayMode: 'pages',
    enableRowNumbers: true,
    rowNumberMode: 'original',
    // positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    enableStickyHeader: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      density: 'xs',
      expanded: true,
      grouping: ['state'],
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'state', desc: false }],
    },
    mantineTableProps: {
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
    },
    renderTopToolbar: ({ table }) => {
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
    },
  });
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <MantineReactTable table={table} />
    </MantineProvider>
  );
};

export default KPITable;
