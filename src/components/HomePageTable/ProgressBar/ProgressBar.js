import React from 'react';

// Import react-circular-progressbar module and styles
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Radial separators
import RadialSeparators from './RadialSeparators';

const ProgressBar = () => (
  <div style={{ padding: '5px' }}>
    <RadialProgressBar label="Progressbar with separators" style={{ width: 10, height: 10 }}>
      <CircularProgressbarWithChildren
        // value of Progress bar
        value={80}
        // text={`${80}%`}
        strokeWidth={10}
        styles={buildStyles({
          trailColor: '#808080',
          textColor: '#e3af32',
          pathColor: '#e3af32',
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: '',
            width: '3px',
            // This needs to be equal to props.strokeWidth
            height: `${10}%`,
          }}
        />
      </CircularProgressbarWithChildren>
    </RadialProgressBar>
  </div>
);

function RadialProgressBar(props) {
  return (
    <div>
      <div style={{ marginTop: 30, display: 'flex' }}>
        <div style={{ width: '50%', paddingRight: 30 }}>{props.children}</div>
        <div style={{ width: '70%' }}>
          <h3 className="h4" style={{ color: 'white' }}>
            {'1st Assessment Cycle'}
          </h3>

          {/*<p> Value of Progress bar with Percentage symbol*/}
          <span className="golden-text">
            <strong style={{ fontSize: 50, fontWeight: 700 }}>{`${80}%`}</strong>
          </span>

          {/*<p>Some more Info</p>*/}
        </div>
      </div>
    </div>
  );
}
export default ProgressBar;
