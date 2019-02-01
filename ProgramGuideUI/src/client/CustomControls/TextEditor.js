import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import $ from 'jquery';
import "./TextEditor.css";

class CustomRichTextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    setDefaultText: true
  }

  onChange = (value) => {
    this.setState({ value, setDefaultText: false }, function () {
      // Pass the entered text value to calling component
      this.props.getRichTextEditorValue(value.toString('html'))
    });
  };
  componentDidMount() {
    $('#RichTextEditor a').hover(function (e) {
      //console.log(e.pageX);
      var title = $(this).attr("href");
      $('<div/>', {
        text: title,
        class: 'toolTip'
      }).appendTo(this);
    }, function () {
      $(document).find("div.toolTip").remove();
    }
    );
  }

  render() {
    let Value = this.state.value

    //Set initital value of Text Editor
    if (this.props.defaultValue !== undefined && this.state.setDefaultText) {
      Value = RichTextEditor.createValueFromString(this.props.defaultValue, 'html');
    }

    return (
      <div id="RichTextEditor">
        <RichTextEditor
          value={Value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default CustomRichTextEditor;