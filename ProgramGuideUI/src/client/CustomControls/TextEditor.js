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
    this.setState({ value, setDefaultText: false }, function(){
    // Pass the entered text value to calling component
    this.props.getRichTextEditorValue(value.toString('html'))
    });
  };


  render() {
    let Value = this.state.value

    //Set initital value of Text Editor
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
