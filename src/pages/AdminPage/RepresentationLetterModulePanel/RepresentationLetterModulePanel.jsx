import React from 'react';
import { useEffect, useState } from 'react';
import '../AdminLandingPageStyle.scss';
import PageWrapper from '../../../components/wrappers/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getAll_Roles } from '../../../redux/AdminPage/AdminPageAction';
import BU_AdminTable from './Tables/BU_AdminTable';
import Functional_AdminTable from './Tables/Functional_AdminTable';
import BU_Zone_AdminTable from './Tables/BU_Zone_AdminTable';
import Functional_Zone_AdminTable from './Tables/Functional_Zone_AdminTable';

const RepresentationLetterModulePanel = () => {
  const dispatch = useDispatch();

  return (
    <PageWrapper>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            {localStorage.getItem('selected_module_Role') == 'BU' ? (
              <>
                <BU_AdminTable />
                <BU_Zone_AdminTable />
              </>
            ) : (
              <>
                <Functional_AdminTable />
                <Functional_Zone_AdminTable />
              </>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RepresentationLetterModulePanel;
