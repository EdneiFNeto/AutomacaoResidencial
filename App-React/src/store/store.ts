import {createStore} from 'redux';
import {consumptionReducer} from './consumptionReduce';

export const store = createStore(consumptionReducer);
