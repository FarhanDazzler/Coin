import React from 'react';
import PageWrapper from '../../components/wrappers/PageWrapper';
import KPITable from './KpiComponent/KPITable';

const KpiModule = () => {
  return (
    <>
      <PageWrapper>
        <div className="container-fluid">
          <div className="pt-7 pl-2">
            <div style={{ fontSize: 34, fontWeight: 600 }}>
              Welcome to the <span className="golden-text">KPI Module</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad totam, repudiandae nulla
              officiis voluptatum ex consectetur dolorum similique molestiae doloribus, veritatis
              accusantium eos. Sint, illum quidem numquam saepe laboriosam ipsam.
            </div>
          </div>
          <div>For Filters and buttons</div>
          <div>For submit button</div>
          <div>
            <KPITable />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default KpiModule;
