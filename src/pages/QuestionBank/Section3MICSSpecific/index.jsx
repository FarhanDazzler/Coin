import React from 'react';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import FormControl from '@mui/material/FormControl';
import Select from '../../../components/UI/Select/Select';
import { levels } from '../CreateQuestions/constant';
import { Loader } from 'semantic-ui-react';
import RenderBlock from '../../../components/RenderBlock';
import { useSelector } from 'react-redux';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';

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

const Section3MICSSpecific = ({
  level,
  handleChangeLevel,
  section3,
  handleChangeRenderBlock,
  inputCenter,
  moreOptions,
}) => {
  const questionData = useSelector(question3Selector);
  return (
    <div>
      <div className="pt-5 px-4 ">
        <div className={inputCenter ? 'd-flex justify-content-center' : ''}>
          {moreOptions && moreOptions}
          <div className="select-light">
            <FormControl sx={{ width: 300 }}>
              <Select
                value={level}
                onChange={handleChangeLevel}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }
                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                options={levels}
              />
            </FormControl>
          </div>
        </div>

        <div className="pt-5">
          {questionData.loading ? (
            <div className="d-flex w-100 justify-content-center pt-4" id="loader">
              <Loader />
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <RenderBlock blocks={section3} handleChange={handleChangeRenderBlock} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Section3MICSSpecific;
