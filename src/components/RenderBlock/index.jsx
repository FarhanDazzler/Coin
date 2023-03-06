import React from 'react';
import blockType from './constant';
import Radio from '../UI/Radio';
import RenderBlockWrapper from './RenderBlockWrapper';
import './renderBlocksStyles.scss';
import Input from '../UI/Input';
import RadioMulti from '../UI/RadioMulti';
import RadioWithInput from '../UI/RadioWithInput';

const RenderBlock = ({ blocks = [], handleChange }) => {
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
