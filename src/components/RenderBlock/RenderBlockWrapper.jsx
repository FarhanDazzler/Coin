import React from 'react';

const RenderBlockWrapper = ({ children, ...res }) => {
  return (
    <div className="renderBlockWrapper" {...res}>
      {children}
    </div>
  );
};

export default RenderBlockWrapper;
