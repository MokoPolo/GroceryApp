import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import appConfig from './settings.json';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    Name: 'C',
    id: 1972
  },
  {
    Name: 'Elm',
    id: 2012
  },
  {
    Name: 'C',
    id: 1972
  },
  {
    Name: 'E',
    id: 1972
  },
  {
    Name: 'F',
    id: 1972
  },
  {
    Name: 'G',
    id: 1972
  },
  {
    Name: 'J',
    id: 1972
  },
  {
    Name: 'K',
    id: 1972
  },
  {
    Name: 'W',
    id: 1972
  },
  {
    Name: 'II',
    id: 1972
  },
];




class Example extends React.Component {
  constructor() {
    super();

    this.getSuggestions = this.getSuggestions.bind(this);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      crack: 'foo',
      arr: [
        {
          Name: 'C',
          id: 1972
        },
        {
          Name: 'Elm',
          id: 2012
        },
        {
          Name: 'C',
          id: 1972
        },
        {
          Name: 'E',
          id: 1972
        },
        {
          Name: 'F',
          id: 1972
        },
        {
          Name: 'G',
          id: 1972
        },
        {
          Name: 'J',
          id: 1972
        },
        {
          Name: 'K',
          id: 1972
        },
        {
          Name: 'W',
          id: 1972
        },
        {
          Name: 'II',
          id: 1972
        },
      ],
    };
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.Name}
      </div>
    );
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    // Do query to DB here
    const settings = appConfig;
    fetch(`${settings.RestServerLocation}/Api/ingredient?filter=`+value)
      .then(result => result.json())
      .then((data) => {
        const arr = data;
        this.setState({ arr: arr }, () => {
          const coocoo = inputLength === 0 ? [] : this.state.arr.filter(lang =>
            //return inputLength === 0 ? [] : languages.filter(lang =>
            lang.Name.toLowerCase().slice(0, inputLength) === inputValue
          );

          this.setState({
            suggestions: coocoo
          });
        });

        /*         let coo = this.state.arr.filter(lang =>
                  //return inputLength === 0 ? [] : languages.filter(lang =>
                  lang.name.toLowerCase().slice(0, inputLength) === inputValue
                ); */

      });
  };
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(suggestion) {
    return suggestion.Name;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    // Call rest service here
    this.getSuggestions(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  storeInputReference = autosuggest => {
    console.log("storeInputReference");
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

    // Update DB here
    console.log('onSuggestionSelected yo');
    console.log(this.state);
    console.log(suggestionValue);
  }
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        ref={this.storeInputReference}
      />
    );
  }
}

export default Example;
