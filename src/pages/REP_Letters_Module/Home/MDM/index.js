import React, { useEffect } from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import MDMBox from '../../../MDM/MDMBox/MDMBox';
import { useDispatch, useSelector } from 'react-redux';
import { getRlOrgHierarchy, getRlOrgMd } from '../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import '../../../MDM/MDMStyle.scss';
import './RLMDMStyle.scss';
import {
  getRlOrgHierarchySelector,
  getRlOrgMDSelector,
} from '../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';

const RLMDM = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRlOrgHierarchy());
    dispatch(getRlOrgMd());
  }, []);
  return (
    <PageWrapper>
     
      <div className="container-fluid py-5" style={{ display: 'flex' }}>
        <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
          <MDMBox
            title="Organization Hierarchy"
            description="Create or modify a Organization within the Organization Hierarchy"
            url="/REP-Letters/master-data-management/organization-hierarchy"
          />
        </div>
        {localStorage.getItem('selected_module_Role') == 'BU' ? (
          <>
            <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
              <MDMBox
                title="BU Masterdata Management"
                description="Assign BU Master Data within the Organization Hierarchy."
                url="/REP-Letters/master-data-management/bu-masterdata-management"
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-6 py-4 MDMBoxWrapper">
              <MDMBox
                title="Functional Masterdata management"
                description="Create or modify MICS in the MICS Framework table."
                url="/REP-Letters/master-data-management/functional-masterdata-management"
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default RLMDM;
