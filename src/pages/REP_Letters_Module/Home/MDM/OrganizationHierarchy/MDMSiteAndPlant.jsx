import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import NavTabsMDM from '../MDM_Tab_Buttons/TabButtons';
import { getSiteAndPlant } from '../../../../../redux/MDM/MDM_Action';
import { sitesAndPlantDataSelector } from '../../../../../redux/MDM/MDM_Selectors';
import Table2 from '../../../../../components/UI/Table/Table2';

const MDMSiteAndPlant = () => {
  const sitesAndPlantData = useSelector(sitesAndPlantDataSelector);
  const dispatch = useDispatch();

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
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
      accessorKey: 'Recipient',
      id: 'Recipient',
      header: 'Recipient',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Functional',
      id: 'Functional',
      header: 'Functional',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Plant_Code',
      id: 'Plant_Code',
      header: 'Plant Code',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Plant_Name',
      id: 'Plant_Name',
      header: 'Plant Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Applicability',
      id: 'Applicability',
      header: 'Applicability',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  useEffect(() => {
    dispatch(getSiteAndPlant());
  }, []);

  return (
    <PageWrapper>
      <div className="col-12 col-lg-12">
        <NavTabsMDM />

        <div className="container-fluid mt-5">
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <Table2
                tableData={sitesAndPlantData?.data || []}
                loading={sitesAndPlantData.loading}
                tableColumns={TABLE_COLUMNS}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MDMSiteAndPlant;
