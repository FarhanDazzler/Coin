import React from 'react';
import { Badge } from '@mantine/core';
import FeatherIcon from 'feather-icons-react';

const DashboardCards = ({ data = {} }) => {
  const { cardTitle, badge, actionList = [] } = data;
  return (
    <div>
      <div className="d-flex align-items-center mt-6">
        <span className="card-main-title">{cardTitle}</span>
        {badge && (
          <Badge color={badge.color} size="md" radius="lg" variant="filled">
            {badge.title}
          </Badge>
        )}
      </div>
      {actionList.length > 0 ? (
        actionList.map((list = {}) => {
          const { icon, errorText, message } = list;
          return (
            <div className="black-bg-wrapper">
              <div className="content-part">
                {(icon || errorText) && (
                  <div className="red-text d-flex align-items-center">
                    {icon && <span className="mr-2">{icon}</span>}
                    {errorText && <span>{errorText}</span>}
                  </div>
                )}
                <p className="m-0">{message}</p>
              </div>
              <div>
                <FeatherIcon
                  color="#e3af32"
                  icon="arrow-right"
                  // size={14}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-data-dashboard-list">
          <div className="d-flex align-items-center justify-content-center">
            <FeatherIcon
              color="#1e1e1e"
              icon="check-circle"
              // size={14}
            />
            <span className="pl-3">No pending task</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;
