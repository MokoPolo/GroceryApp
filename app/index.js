import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//var React = require('react');
//var ReactDOM = require('react-dom');
//var App = require('./components/App');

/*const App = (props) => {
    //const tasks = ["Get Milk", "Sleep", "Drive to work"];
      return (
        <div>
          <h1>Hello how are you</h1>
        </div>
      );   
  };
*/
/*ReactDOM.render(
  <h1>Hello, world!</h1>,
    document.getElementById('app')
);*/
const element = (
  <h1>
    Hello, Marc!
  </h1>
);


class Comp extends Component {
  render() {
    return (<div>Comp with ES5</div>);
  }
}



ReactDOM.render(
  Comp,
    document.getElementById('app')
);