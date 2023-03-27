import React, { useEffect } from 'react';
import { ReactComponent as WarningIcon } from '../../../assets/images/warningIcon.svg';
import './AttributesRemoveModal.scss';
import Portal from '../Portal';
import Button from '../Button';
import Typography from '@mui/material/Typography';

const RemoveWarningModal = ({
  onConfirm,
  onClose,
  message = 'Are you sure you want to remove?',
  subtitle = 'This cannot be undone.',
  confirmButtonText = 'Remove',
  cancelText = 'Cancel',
  block
}) => {
  console.log(block)
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      onConfirm();
    }
    if ([27, 8].includes(event.keyCode)) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className="w-full remove-attribute-modal d-flex align-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div
          className="remove-attribute-modal__content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="remove-attribute-modal__message mb-5">
            <div className="warningIcon">
              <WarningIcon />
            </div>
            <Typography className="typography-18-medium">{message}</Typography>
            {
              block?.question_text && (
                <Typography className="typography-16-regular remove-attribute-modal__subtitle">
                  {block?.question_text}
                </Typography>
              )
            }


            <Typography className="typography-14-regular c-grey-600 remove-attribute-modal__subtitle">
              {subtitle}
            </Typography>
          </div>
          <div className="remove-attribute-modal__btns d-flex align-center justify-center">
            <Button
              color="secondary"
              onClick={onClose}
              variant="outlined"
              className="w-full remove-attribute-modal__btn mr-3"
            >
              <Typography className="typography-14-regular">{cancelText}</Typography>
            </Button>
            <Button
              onClick={onConfirm}
              color="error"
              className="w-full remove-attribute-modal__btn"
            >
              <Typography className="typography-14-regular">{confirmButtonText}</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default RemoveWarningModal;
