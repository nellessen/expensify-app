import { createStore } from 'redux';

// Action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});
const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
});
const resetCount = () => ({
  type: 'RESET'
});

// Reducers
const countReducer = (state = { count: 0 }, action) => {
  // console.log('Reducing action: ' + action.type);
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
}

// Initiate Store
const store = createStore(countReducer);
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch Actions
store.dispatch(incrementCount( { incrementBy: 5 } ))
store.dispatch(incrementCount())
store.dispatch(resetCount())
store.dispatch(decrementCount( { decrementBy: 10 } ))
store.dispatch(decrementCount())
store.dispatch(setCount({ count: 101 }))
