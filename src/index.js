import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import Homepage from './components/homepage';

import registerServiceWorker from './registerServiceWorker';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Homepage />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
