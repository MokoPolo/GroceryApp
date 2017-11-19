import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
// import PropTypes from 'prop-types';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './App.css';
import Example from './AutoComplete';
import appConfig from './settings.json';

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
class GroceryAddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
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
    this.onChangeClickHandler = this.onChangeClickHandler.bind(this);
    this.addItemClickHandler = this.addItemClickHandler.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
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
  this.setState({
    inputValue: {
      Id: -1,
      Name: newValue
    }
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
  if (autosuggest !== null) {
    this.input = autosuggest.input;
  }
};
onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

  // Update DB here

  this.setState({inputValue: suggestion});
}
  onChangeClickHandler(e) {
    // Maybe do auto complete here
    this.setState({
      inputValue: e.target.value,
    });
  }
  addItemClickHandler() {
        // Call service with string name
        const settings = appConfig;
        console.log("1 " + this.state.inputValue);
        if (this.state.inputValue === '') 
          return;
                // Post to service. Add recipe ingredients to grocery list
            fetch(`${settings.RestServerLocation}/Api/grocery`, {
              method: 'POST',
              headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON',
              },
              body:
                    JSON.stringify({
                      Name: this.state.inputValue.Name,
                      Id: this.state.inputValue.Id,
                      Done: false,
        
                    }),
            }).then(() => {
              this.props.addItemClick(this.state.inputValue);
              this.setState({ inputValue: '' });
            });

  }
  render() {
    const { value, suggestions } = this.state;
    
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: 'Type a programming language',
          value,
          onChange: this.onChange
        };
    return (
      <div>
        <InputGroup>
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
          {/* <Input onChange={this.onChangeClickHandler} value={this.state.inputValue} /> */}&nbsp;
          <InputGroupButton>
            <Button onClick={this.addItemClickHandler}>Add item</Button>
          </InputGroupButton>
        </InputGroup>
      </div>
    );
  }
}

GroceryAddItem.propTypes = {
  addItemClick: PropTypes.func,
};
GroceryAddItem.defaultProps = {
  addItemClick: null,
};
export default GroceryAddItem;
