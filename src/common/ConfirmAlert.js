import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';

export default function ConfirmAlert(props) {
  const { type } = props;
  const confirmBtnText = props.confirmBtnText || 'Yes';

  return (
    <SweetAlert
      style={{ fontSize: '1vw' }}
      type={type}
      showCancel={props.cancelButton !== false}
      showCloseButton
      confirmBtnText={confirmBtnText}
      cancelBtnText="No"
      title={props.title}
      onConfirm={() => props.confirm()}
      onCancel={() => props.hideAlert()}
    >
      {props.body}
    </SweetAlert>
  );
}
ConfirmAlert.propTypes = {
  type: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string.isRequired,
  cancelButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  hideAlert: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
};

{/* <ConfirmAlert
  confirm={hideAlert}
  hideAlert={hideAlert}
  cancelButton={false}
  confirmBtnText="Ok"
  type={successData === true ? 'success' : 'warning'}
  title={successData === true ? 'Sent ' : 'Failed'}
  body={successData === true ? 'Password sent to your mail.' : `${successData}`}
/>; */}
