import { combineReducers } from 'redux';
import contractReducer from './reducer_contracts';

const rootReducer = combineReducers({
  contracts: contractReducer
});

export default rootReducer;
