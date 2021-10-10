import {createStore} from 'redux';
import {StateProps} from '../model/statesProps';

const reducer = (state: StateProps = StateProps.LIST_ITEM, action) => {
  switch (action.type) {
    case StateProps.LIST_ITEM:
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
