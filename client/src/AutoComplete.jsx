import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
        name: 'C',
        year: 1972
      },
      {
        name: 'E',
        year: 1972
      },
      {
        name: 'F',
        year: 1972
      },
      {
        name: 'G',
        year: 1972
      },
      {
        name: 'J',
        year: 1972
      },
      {
        name: 'K',
        year: 1972
      },
      {
        name: 'W',
        year: 1972
      },
      {
        name: 'II',
        year: 1972
      },
  ];
  
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );
  
  class Example extends React.Component {
    constructor() {
      super();
  
      // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      this.state = {
        value: '',
        suggestions: []
      };
    }
  
    onChange = (event, { newValue }) => {
        console.log("JACKPOT");
      this.setState({
        value: newValue
      });
    };
  
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        console.log("onSuggestionsFetchRequested " + value);
        // Call rest service here
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        console.log("onSuggestionsClearRequested ");
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
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          ref={this.storeInputReference}
        />
      );
    }
  }

  export default Example;