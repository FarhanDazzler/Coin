import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Group, MultiSelect } from '@mantine/core';
import Table2 from '../../../../../components/UI/Table/Table2';
import TableLoader from '../../../../../components/UI/TableLoader';
import Button from '../../../../../components/UI/Button';
import NoDataPlaceholder from '../../../../../components/NoDataPlaceholder/NoDataPlaceholderForRepLetter';
import { get_BU_GlobalPersonaHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { get_BU_GlobalPersonaHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import LinearProgress from '@mui/material/LinearProgress';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

const FilterMultiSelect = ({ data, label, value, onChange }) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <MultiSelect
      className="mantine-MultiSelect-wrapper"
      data={data}
      label={<span className="mantine-MultiSelect-label">{label}</span>}
      placeholder="Select your option"
      searchable
      limit={20}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      nothingFound="Nothing found"
      clearButtonLabel="Clear selection"
      clearable
      value={value}
      onChange={onChange}
      radius="xl"
      variant="filled"
      size="xs"
    />
  );
};

const ShowSignatures = ({ signatures = {} }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    setCount(Object.keys(signatures).length);
    let val = 0;
    Object.keys(signatures).map((d) => {
      if (signatures[d]) {
        val = val + 1;
      }
    });
    setActive(val);
  }, [signatures]);

  const getSignaturesName = (val) => {
    switch (val) {
      case 'buh_signed':
        return 'BU Head';
      case 'fd_signed':
        return 'Finance Director';
      case 'zc_signed':
        return 'Zone Control';
      case 'zv_signed':
        return 'Zone VP';
      default:
        return val.split('_').join(' ');
    }
  };

  return (
    <>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <p className="m-0">
          {active} of {count}
        </p>
        <LinearProgress variant="determinate" value={active * (100 / count)} />
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {Object.keys(signatures).map((s) => {
            return (
              <div className="d-flex align-items-center justify-content-between w-full">
                <span>{getSignaturesName(s)}</span>
                <Radio size="small" checked={signatures[s]} />
              </div>
            );
          })}
        </Typography>
      </Popover>
    </>
  );
};

const GlobalPersonaTable = ({
  assessmentCycleValue,
  setAssessmentCycleValue,
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
}) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const getGlobalPersonaHomePageData = useSelector(get_BU_GlobalPersonaHomePageDataSelector);

  //getGlobalPersonaHomePageData?.data[0]?.recipientData
  const recipientHomePageData = useMemo(() => {
    return getGlobalPersonaHomePageData?.data[0]?.home_page_table_global || [];
  }, [getGlobalPersonaHomePageData?.data[0]]);

  useEffect(() => {
    dispatch(get_BU_GlobalPersonaHomePageData());
  }, [token, dispatch]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Action',
      id: 'Action',
      header: 'Action',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return (
          <div>
            {row.row.original.Status === 'Completed' && (
              <Button
                className="mr-2"
                onClick={() => {
                  const data = {
                    scopeData: row.row.original,
                    modalType: 'review',
                    letterType: row.row.original.Letter_Type === 'BU Letter' ? 'BU' : 'Zone',
                  };
                  history.push('/REP-Letters/attempt-letter/BU-letter-form', { data });
                }}
              >
                Review
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Status',
      id: 'Status',
      header: 'Over All Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'signatures',
      id: 'signatures',
      header: 'Signatures',
      flex: 1,
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <ShowSignatures signatures={row.row.original?.signatures} />;
      },
    },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Disclosure Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'BU_Head',
      id: 'BU_Head',
      header: 'BU Head',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Finance_Director',
      id: 'Finance_Director',
      header: 'Finance Director',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Letter_Type',
      id: 'Letter_Type',
      header: 'Letter Type',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Year',
      id: 'Year',
      header: 'Year',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  useEffect(() => {
    if (!recipientHomePageData?.length) return setTableDataArray([]);
    if (!assessmentCycleValue?.length && !zoneValue?.length && !buValue?.length) {
      return setTableDataArray(recipientHomePageData);
    }
    const updatedData = recipientHomePageData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, buValue, recipientHomePageData]);
  return (
    <>
      <div className="container-fluid">
        {getGlobalPersonaHomePageData?.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <Group spacing="xs" className="actions-button-wrapper">
                <FilterMultiSelect
                  data={getGlobalPersonaHomePageData?.data[0]?.distinct_zone || []}
                  label="Zone"
                  value={zoneValue}
                  onChange={setZoneValue}
                />
                <FilterMultiSelect
                  data={getGlobalPersonaHomePageData?.data[0]?.distinct_bu || []}
                  label="BU"
                  value={buValue}
                  onChange={setBUValue}
                />
                <FilterMultiSelect
                  data={getGlobalPersonaHomePageData?.data[0]?.distinct_assesment_cycle || []}
                  label="Assessment Cycle"
                  value={assessmentCycleValue}
                  onChange={setAssessmentCycleValue}
                />
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
              {tableDataArray?.length > 0 ? (
                <Table2
                  tableData={tableDataArray}
                  loading={getGlobalPersonaHomePageData.loading}
                  tableColumns={TABLE_COLUMNS}
                />
              ) : (
                <NoDataPlaceholder />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalPersonaTable;
