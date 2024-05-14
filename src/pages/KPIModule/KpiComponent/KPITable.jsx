import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import readXlsxFile from 'read-excel-file';
import { getCsvTampredDataAction } from '../../../redux/CsvTampred/CsvTampredAction';
import { Box, Button, Flex, Menu, Text, Title, MantineProvider } from '@mantine/core';
import Workbook from 'react-excel-workbook';
import { data } from './data';
import '../KpiModule.scss';
import { useTranslation } from 'react-i18next';

const KPITable = () => {
  const { t } = useTranslation();
  const stateCsvTampred = useSelector((state) => state?.csvTampred?.data);
  const [excelFile, setExcelFile] = useState(null);
  const [csvUpdateData, setScvUpdateData] = useState(0);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
        id: 'name', //id is still required when using accessorFn instead of accessorKey
        header: 'Name',
        size: 250,
        filterVariant: 'autocomplete',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Email',
        size: 300,
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 200,
        filterVariant: 'range-slider',
        mantineFilterRangeSliderProps: {
          color: 'indigo',
          label: (value) =>
            value?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
        },
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 50_000
                  ? theme.colors.red[9]
                  : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                  ? theme.colors.yellow[9]
                  : theme.colors.green[9],
              borderRadius: '4px',
              color: '#fff',
              maxWidth: '9ch',
              padding: '4px',
            })}
          >
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: 'jobTitle', //hey a simple column for once
        header: 'Job Title',
        filterVariant: 'multi-select',
        size: 350,
      },
      {
        accessorFn: (row) => {
          //convert to Date for sorting and filtering
          const sDay = new Date(row.startDate);
          sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
          return sDay;
        },
        id: 'startDate',
        header: 'Start Date',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
        enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      },
    ],
    [],
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      document.getElementById('combine_btn').reset();

      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Basic Q09JTjpDT0lOX1NlY3VyZUAxMjM=');
      myHeaders.append('Content-Type', 'application/json');

      var apiBody = {
        input_table: tableData,
        output_table: excelFile,
      };
      console.log(excelFile);
      dispatch(getCsvTampredDataAction(apiBody));
      if (stateCsvTampred?.data === false) {
        // let newDataArray = tableData?.map((data, i) => {
        //   return {
        //     ...data,
        //     Numerator: excelFile[i]?.Numerator,
        //     Denominator: excelFile[i]?.Denominator,
        //     Upload_Approach: excelFile[i]['KPI Data source (Select from Excel/PBI/Celonis/Others)'],
        //     Source_System: excelFile[i]['Link to data'],
        //   };
        // });
        // console.log(newDataArray, 'newDataArray');
        // setTableData([...newDataArray]);
        // setScvUpdateData(csvUpdateData + 1);
      } else {
        setScvUpdateData(0);
      }
    } else {
      setTableData(null);
    }
  };
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile) {
        readXlsxFile(selectedFile).then((data) => {
          setExcelFile(
            data.slice(1).map((d) => {
              let obj = {};
              d.map((v, i) => {
                obj[data[0][i]] = v;
              });
              return obj;
            }),
          );
        });
      } else {
        setExcelFile(null);
      }
    } else {
      // console.log('plz select your file');
    }
  };
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    // enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },

    // renderDetailPanel: ({ row }) => (
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       justifyContent: 'flex-start',
    //       alignItems: 'center',
    //       gap: '16px',
    //       padding: '16px',
    //     }}
    //   >
    //     <img alt="avatar" height={200} src={row.original.avatar} style={{ borderRadius: '50%' }} />
    //     <Box sx={{ textAlign: 'center' }}>
    //       <Title>Signature Catch Phrase:</Title>
    //       <Text>&quot;{row.original.signatureCatchPhrase}&quot;</Text>
    //     </Box>
    //   </Box>
    // ),
    // renderRowActionMenuItems: () => (
    //   <>
    //     <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
    //     <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
    //   </>
    // ),
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'));
        });
      };

      return (
        <Flex p="md" justify="space-between" className="kpi_module_buttons">
          <Flex sx={{ gap: '8px' }}>
            <button className="custom-btn mt-2 submit-btn">Submit</button>
            <div className="row kpi_table_row" id="export_button_right">
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
            </form>
          </Flex>
          <Flex gap="xs">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
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
