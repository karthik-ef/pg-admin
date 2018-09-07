import Autosuggest from 'react-autosuggest';
import React from 'react';
import ReactDOM from 'react-dom';

class TextBox extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      theme: {},
      language: [],
      setInitialValue: true
    };
  }

  componentDidMount() {
    this.Load();
  }

  Load() {
    this.setState({
      theme: {
        container: {
          position: 'relative'
        },
        input: {
          width: 400,
          height: 30,
          padding: '10px 20px',
          fontFamily: 'Helvetica, sans-serif',
          fontWeight: 300,
          fontSize: 16,
          border: '1px solid #aaa',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
        inputFocused: {
          outline: 'none'
        },
        inputOpen: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        suggestionsContainer: {
          display: 'none'
        },
        suggestionsContainerOpen: {
          display: 'block',
          position: 'absolute',
          top: 41,
          width: 400,
          border: '1px solid #aaa',
          backgroundColor: '#fff',
          fontFamily: 'Helvetica, sans-serif',
          fontWeight: 300,
          fontSize: 16,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          zIndex: 2
        },
        suggestionsList: {
          margin: 0,
          padding: 0,
          listStyleType: 'none',
        },
        suggestion: {
          cursor: 'pointer',
          padding: '10px 20px'
        },
        suggestionHighlighted: {
          backgroundColor: '#ddd'
        }
      },
      language: this.props.PageUrl
    });
  }


  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.language.filter(language => regex.test(language.name)).slice(0, 10);
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue, setInitialValue: false
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onBlur = (event, { highlightedSuggestion }) => {
    this.props.selectedValue(this.state.value)
    }

  render() {
    const { value, suggestions } = this.state;
    let inputProps = {};
    if(this.state.setInitialValue && this.props.SetInitialData !== undefined){
      inputProps  = {
        value: this.props.SetInitialData,
        onChange: this.onChange,
        onBlur: this.onBlur,
        disabled: true
      };
    }
    else {
      inputProps = {
        placeholder: "Enter Here",
        value,
        onChange: this.onChange,
        onBlur: this.onBlur
      };
    }

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={this.state.theme}
      />
    );
  }
}

export default TextBox;
