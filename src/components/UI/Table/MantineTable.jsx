import { useMemo } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title, MantineProvider } from '@mantine/core';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import { data } from './data';

const MantineTable = ({ tableData, tableColumns }) => {
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
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: '8px' }}>
            <Button
              color="red"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="filled"
            >
              Deactivate
            </Button>
            <Button
              color="green"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="filled"
            >
              Activate
            </Button>
            <Button
              color="blue"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="filled"
            >
              Contact
            </Button>
          </Flex>
        </Flex>
      );
    },
  });
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <MantineReactTable table={table} theme={{}} />
    </MantineProvider>
  );
};

export default MantineTable;