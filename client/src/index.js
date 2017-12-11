import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger  } from 'redux-logger';
import combineReducer from './Reducers/CombineReducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const middleware = [ thunk ];
middleware.push(createLogger());
/* const logger = createLogger({
    //level: 'info'
  }); */

const store = createStore(combineReducer,
    applyMiddleware(...middleware)
  );

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
//render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();
