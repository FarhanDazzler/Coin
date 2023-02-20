import React, { useState } from 'react';
import CustomModal from '../../UI/CustomModal';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormControl from '@mui/material/FormControl';
import Select from '../../UI/Select/Select';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CollapseFrame from '../../UI/CollapseFrame';
import './createQuestionsStyles.scss';
import QuestionsWithAction from '../../UI/QuestionsWithAction';
import { names, questions } from './constant';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 340,
    },
  },
};

const CreateQuestions = () => {
  const [section1, setSection1] = useState(questions);
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState(['All Zones']);

  const handleClose = () => {};

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <CustomModal
        open={open}
        title={
          <span>
            <AccessTimeOutlinedIcon className="mr-3" />
            Create Questions for New MICS
          </span>
        }
        width={1080}
        onClose={handleClose}
      >
        <div className="select-light">
          <FormControl sx={{ width: 300 }}>
            <Select
              value={personName}
              onChange={handleChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Placeholder</em>;
                }
                return selected.join(', ');
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
              options={names}
            />
          </FormControl>
        </div>

        <div className="questions-list-main-wrapper">
          <CollapseFrame
            title="Section 1 : Standard "
            centerText={
              <p className="d-flex m-0 align-items-center">
                <InfoOutlinedIcon className="mr-1" /> Standard questions will be common and included
                in all new surveys
              </p>
            }
          >
            <div className="pt-5">
              {section1.map((data, i) => (
                <QuestionsWithAction number={i + 1} text={data.question} />
              ))}
            </div>
          </CollapseFrame>

          <CollapseFrame
            title="Section 2 : KPI "
            centerText={
              <p className="d-flex m-0 align-items-center">
                <InfoOutlinedIcon className="mr-1" /> Standard questions will be common and included
                in all new surveys
              </p>
            }
          >
            <div className="pt-5">
              {section1.map((data, i) => (
                <QuestionsWithAction number={i + 1} text={data.question} />
              ))}
            </div>
          </CollapseFrame>
        </div>
      </CustomModal>
    </div>
  );
};

export default CreateQuestions;
