import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

class CustomRichTextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    setDefaultText: true
  }

  onChange = (value) => {
    this.setState({ value, setDefaultText: false });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };


  render() {

    let Value = this.state.value
    if (this.props.defaultValue !== undefined && this.state.setDefaultText) {
      Value = RichTextEditor.createValueFromString(this.props.defaultValue, 'html');
    }

    return (
      <RichTextEditor
        value={Value}
        onChange={this.onChange}
      />
    );
  }
}
export default CustomRichTextEditor;
