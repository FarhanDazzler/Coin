import React from 'react';
import blockType from './constant';
import Radio from '../UI/Radio';
import RenderBlockWrapper from './RenderBlockWrapper';
import './renderBlocksStyles.scss';
import Input from '../UI/Input';
import RadioMulti from '../UI/RadioMulti';
import RadioWithInput from '../UI/RadioWithInput';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../UI/Dropdown';
import InputWidthSelect from '../UI/InputWidthSelect/InputWidthSelect';

const RenderBlock = ({ blocks = [], handleChange, userApiStart, isModal, isChangeLang }) => {
  const controlDataResponse = useSelector((state) => state?.controlData?.controlData?.data);
  for (let i = 0; i < blocks.length; i++) {
    let question = blocks[i].label;
    question = question?.replaceAll('{{org}}', controlDataResponse?.provider_org);
    question = question?.replaceAll('{{ReceiverOrg}}', controlDataResponse?.provider_org);
    question = question?.replaceAll('{{freq}}', controlDataResponse?.frequency);
    question = question?.replaceAll('({{Frequency}})', controlDataResponse?.frequency);
    blocks[i].label = question;
  }
  return (
    <div className="w-100">
      {blocks.map((block, i) => {
        if (!block) return;
        switch (block.question_type) {
          case blockType.RADIO:
            return (
              <RenderBlockWrapper key={`${i}--Radio`}>
                <Radio
                  block={block}
                  label={block.label}
                  options={block.options}
                  value={block.value}
                  handleChange={handleChange}
                  disabled={!isModal}
                />
              </RenderBlockWrapper>
            );
          case blockType.DROPDOWN:
            return (
              <RenderBlockWrapper key={i}>
                <Dropdown
                  block={block}
                  label={block.label}
                  options={block.options}
                  value={block.value}
                  handleChange={handleChange}
                  disabled={!isModal}
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
                  disabled={!isModal}
                  isChangeLang={isChangeLang}
                />
              </RenderBlockWrapper>
            );

          case blockType.RADIO_WITH_INPUT:
            return (
              <RenderBlockWrapper key={i}>
                <RadioWithInput
                  block={block}
                  label={block.label}
                  options={block.options}
                  value={block.value}
                  handleChange={handleChange}
                  disabled={!isModal}
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
                  value={block.value}
                  disabled={!isModal}
                />
              </RenderBlockWrapper>
            );

          case blockType.EMAIL_WIDTH_SELECT:
          case blockType.IS_AD:
            return (
              <RenderBlockWrapper key={i}>
                <InputWidthSelect
                  block={block}
                  handleChange={handleChange}
                  userApiStart={userApiStart}
                  disabled={!isModal}
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
