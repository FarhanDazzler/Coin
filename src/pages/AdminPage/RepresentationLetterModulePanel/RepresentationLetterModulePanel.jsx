import React from 'react';
import { useEffect, useState } from 'react';
import '../AdminLandingPageStyle.scss';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getAll_Roles } from '../../../redux/AdminPage/AdminPageAction';
import BU_AdminTable from './Tables/BU_AdminTable';
import Functional_AdminTable from './Tables/Functional_AdminTable';

const RepresentationLetterModulePanel = () => {
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
            <BU_AdminTable />
            <Functional_AdminTable />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RepresentationLetterModulePanel;
