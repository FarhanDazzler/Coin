import * as React from 'react';
import Modal from '@mui/material/Modal';
import './modalStyles.scss';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const CustomModalDark = ({
  title = '',
  bodyClassName,
  width = 600,
  children,
  classes = {},
  onClose,
  ...res
}) => {
  let rootClass = 'custom-modal-wrapperDark';
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  if ('root' in classes) {
    rootClass = `${rootClass} ${classes.root}`;
    delete classes.root;
  }
  return (
    <div>
      <Modal classes={{ root: rootClass, ...classes }} {...res}>
        <div className="modal-wrapperDark" style={{ maxWidth: width }}>
          <CloseIcon className="close-modal-icon" onClick={onClose} />
          {title && (
            <div className="model-header">
              {title}

              <p className="mb-2">
                <br />
                <br />
                <span className="font-weight-bold">Control Name: </span>
                <span>{stateControlData.control_name}</span>
              </p>
            </div>
          )}
          <div
            className={`modal-bodyDark ${bodyClassName ? bodyClassName : ''}`}
            id="modal-bodyDark"
          >
            {children}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModalDark;
