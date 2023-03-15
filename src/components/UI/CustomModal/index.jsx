import * as React from 'react';
import Modal from '@mui/material/Modal';
import './modalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';

const CustomModal = ({
  title = 'title',
  bodyClassName,
  width = 600,
  children,
  classes = {},
  ...res
}) => {
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  let rootClass = 'custom-modal-wrapper';
  if ('root' in classes) {
    rootClass = `${rootClass} ${classes.root}`;
    delete classes.root;
  }
  return (
    <div>
      <Modal classes={{ root: rootClass, ...classes }} {...res}>
        <div className="modal-wrapper" style={{ maxWidth: width }}>
          {title && <div className="model-header">{title} 
          
          <p className="mb-2">
            <br /><br />
            <span className="font-weight-bold">Control Name: </span>
            <span>
              {stateControlData.control_name}
            </span>
          </p></div>}
          <div className={`modal-body ${bodyClassName ? bodyClassName : ''}`} id="modal-body">
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
