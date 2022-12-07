import React from 'react';

function TextError(props) {
  return (
    <div className="red-text">
      <p>{props.children}</p>
    </div>
  );
}

export default TextError;
