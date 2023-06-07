import React from 'react';
import { useEffect, useState } from 'react';
import '../AdminLandingPageStyle.scss';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import GlobalInternalControlAdminTable from './Tables/GlobalInternalControlAdminTable';
import { getAll_Roles } from '../../../redux/AdminPage/AdminPageAction';

const AssessmentModulePanel = () => {
  const dispatch = useDispatch();

  // API Call using dispatch
  useEffect(() => {
    dispatch(getAll_Roles());
  }, []);

  return (
    <PageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <GlobalInternalControlAdminTable />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AssessmentModulePanel;
