import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import eventDataReducer from '../reducers/eventDataReducer';

const store = createStore(
  eventDataReducer,
  applyMiddleware(thunk)
);

export default store;
