import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import CustomModal from '../../UI/CustomModal';
import Button from '../../../pages/MDM/MDM_Tab_Buttons/Button';
const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [
    'INLINE_STYLE_BUTTONS',
    'BLOCK_TYPE_BUTTONS',
    'LINK_BUTTONS',
    'BLOCK_TYPE_DROPDOWN',
    'HISTORY_BUTTONS',
  ],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

export default class MyStatefulEditor extends Component {
  value = RichTextEditor.createValueFromString(this.props.markup, 'html');
  state = {
    value: this.value,
  };

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString('html'));
    }
  };

  render() {
    return (
      <CustomModal
        className="add-org"
        open={!!this.props?.showModal}
        onClose={() => this.props.setShowModal('')}
        width={900}
        title={'Enter value'}
        bodyClassName="p-0"
      >
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          value={this.state.value}
          onChange={this.onChange}
        />
        <div className="d-flex align-items-center justify-content-end">
          <div>
            <Button variant="outlined" color="secondary" onClick={() => {
              this.props.setShowModal('')
              // this.setState({ value: '' })
              // this.state.value.toString("html");
            }}>
              Cancel
            </Button>
            <Button color="neutral" className="ml-4" onClick={() => {
              this.props.handleSubmit()
              // this.setState({ value: '' })
              // this.state.value.toString("html");
            }}>
              Submit
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  }
}
