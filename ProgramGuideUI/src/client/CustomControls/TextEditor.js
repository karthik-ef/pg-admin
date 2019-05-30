import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import $ from 'jquery';
import "./TextEditor.css";

class CustomRichTextEditor extends Component {

  constructor() {
    super();
    this.editedHtml = false;
  }
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    setDefaultText: true,
    toggleValue: true
  }


  onChange = (value) => {

    console.log(this.props.showHtmlText ? value.toString('markdown') : value.toString('html'));

    this.editedHtml = this.props.showHtmlText ? false : true;

    this.setState({
      value: value,
      setDefaultText: false
    }, function () {
      // Pass the entered text value to calling component
      this.props.getRichTextEditorValue(
        this.props.showHtmlText
          ? value.toString('markdown')
          : value.toString('html')
      );
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
      Value = this.props.showHtmlText
        ? RichTextEditor.createValueFromString(this.props.defaultValue, 'markdown')
        : RichTextEditor.createValueFromString(this.props.defaultValue, 'html');
    }

    if (!this.state.setDefaultText && this.state.toggleValue !== this.props.showHtmlText) {

      Value = this.props.showHtmlText
        ? this.editedHtml
          ? RichTextEditor.createValueFromString(Value.toString('html'), 'markdown')
          : RichTextEditor.createValueFromString(Value.toString('html'), 'html')
        : this.editedHtml
          ? RichTextEditor.createValueFromString(Value.toString('html'), 'html')
          : RichTextEditor.createValueFromString(Value.toString('markdown'), 'html');
    }

    this.state.toggleValue = this.props.showHtmlText;


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