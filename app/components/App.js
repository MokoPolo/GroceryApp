import React, {Component} from 'react';

/*const HelloWorld = () => {
  return (
    <div>
      Hello World
    </div>
  );
};*/

// Stateless component
const App = (props) => {
  return (
    <Comp />
  );   
};

class Comp extends Component {
  render() {
    // return <HelloWorld/>;
    return (    
      <div>
        Hello World
      </div>);
  }
}

export default App;
