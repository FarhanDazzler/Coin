import React from 'react';
import blockType from './constant';
import Radio from '../UI/Radio';
import RenderBlockWrapper from './RenderBlockWrapper';
import './renderBlocksStyles.scss';
import Input from '../UI/Input';
import RadioMulti from '../UI/RadioMulti';
import RadioWithInput from '../UI/RadioWithInput';
import { useDispatch, useSelector } from 'react-redux';

const RenderBlock = ({ blocks = [], handleChange }) => {
  const controlDataResponse = useSelector((state) => state?.controlData?.controlData?.data);
  console.log("hi",controlDataResponse);
  console.log("blocks",blocks);
  for (let i = 0; i < blocks.length; i++) {
    let question = blocks[i].question_text;
    console.log("questions=======>",question)
    question = question.replaceAll('{{org}}', controlDataResponse?.provider_org);
    question = question.replaceAll('{{freq}}', controlDataResponse?.frequency);
    console.log("output",question)
    blocks[i].question_text = question;
    blocks[i].label = question;
    // console.log(question);
  }
  return (
    <div className="w-100">
      {blocks.map((block, i) => {
        if (!block) return;
        switch (block.question_type) {
          case blockType.RADIO:
            return (
              <RenderBlockWrapper key={i}>
                <Radio
                  block={block}
                  label={block.label}
                  options={block.options}
                  value={block.value}
                  handleChange={handleChange}
                />
              </RenderBlockWrapper>
            );

          case blockType.RADIO_MULTI:
            return (
              <RenderBlockWrapper key={i}>
                <RadioMulti
                  block={block}
                  label={block.label}
                  renderOption={block.renderOption}
                  handleChange={handleChange}
                  index={i}
                />
              </RenderBlockWrapper>
            );

          case 'RadioWithInput':
            return (
              <RenderBlockWrapper key={i}>
                <RadioWithInput
                  block={block}
                  label={block.label}
                  options={block.options}
                  value={block.value}
                  handleChange={handleChange}
                />
              </RenderBlockWrapper>
            );

          case blockType.TEXT:
            return (
              <RenderBlockWrapper key={i}>
                <Input
                  label={block.label}
                  required={block.required}
                  block={block}
                  handleChange={handleChange}
                />
              </RenderBlockWrapper>
            );
          default:
            return <div key={i} />;
        }
      })}
    </div>
  );
};
export default RenderBlock;