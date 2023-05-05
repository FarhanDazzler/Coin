import React from 'react';

// Import react-circular-progressbar module and styles
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Radial separators
import RadialSeparators from './RadialSeparators';

const ProgressBar = ({value}) => (
 <div style={{display:'flex',justifyContent:'center'}}>
   <div style={{ width: '60%' }}>
      <CircularProgressbarWithChildren
        // value of Progress bar
        value={value||80}
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
        <div style={{fontSize:35,fontWeight:'bold',color:'#e3af32'}}>{value}%</div>
        <div style={{height:1,background:'white',width:'50%',marginBottom:2}}/>
        <div style={{fontSize:15,color:'#e3af32'}}>COMPLETION</div>
      </CircularProgressbarWithChildren>
      {/* <RadialProgressBar label="Progressbar with separators" style={{ width: 10, height: 10 }}>
    </RadialProgressBar> */}
  </div>
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
