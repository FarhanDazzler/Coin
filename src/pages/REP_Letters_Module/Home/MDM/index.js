import React, { useEffect } from "react";
import PageWrapper from "../../../../components/wrappers/PageWrapper";
import MDMBox from "../../../MDM/MDMBox/MDMBox";
import { useDispatch, useSelector } from 'react-redux';
import { getRlOrgHierarchy, getRlOrgMd } from "../../../../redux/REP_Letters/RLMDM/RLMDMAction";
import '../../../MDM/MDMStyle.scss';
import './RLMDMStyle.scss';
import { getRlOrgHierarchySelector, getRlOrgMDSelector } from "../../../../redux/REP_Letters/RLMDM/RLMDMSelectors";

const RLMDM = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRlOrgHierarchy());
        dispatch(getRlOrgMd());
    }, [])
    return (
        <PageWrapper>
            <div className="container py-5 rl-mdm">
                <div className="col-lg-12 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
                    <MDMBox
                        title="Organization Hierarchy"
                        description="Create or modify a Organization within the Organization Hierarchy"
                        url="/REP-Letters/master-data-management/organization-hierarchy"
                    />

                </div>
            </div>
            <div className="container py-5" style={{ display: 'flex' }}>
                <div className="col-lg-6 py-4 MDMBoxWrapper" style={{ marginRight: '16px' }}>
                    <MDMBox
                        title="BU Masterdata Management"
                        description="Create or modify a Receiver or Provider Organization within the Organization Hierarchy."
                        url="#"
                    />

                </div>
                <div className="col-lg-6 py-4 MDMBoxWrapper">
                    <MDMBox
                        title="Functional Masterdata management"
                        description="Create or modify MICS in the MICS Framework table."
                        url="#"
                    />

                </div>
            </div>
        </PageWrapper>
    );
};

export default RLMDM;