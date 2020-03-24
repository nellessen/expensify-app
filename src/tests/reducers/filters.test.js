import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('filters reducer should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('filters reducer should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sortBy).toBe('amount');
});

test('filters reducer should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount',
  };
  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' });

  expect(state.sortBy).toBe('date');
});

test('filters reducer should set text filter', () => {
  const state = filtersReducer(undefined, { 
    type: 'SET_TEXT_FILTER',
    text: 'TEXT',
  });

  expect(state.text).toBe('TEXT');
});

test('filters reducer should set start date filter', () => {
  const date = moment();
  const state = filtersReducer(undefined, { 
    type: 'SET_START_DATE',
    startDate: date,
  });

  expect(state.startDate).toEqual(date);
});

test('filters reducer should set end date filter', () => {
  const date = moment();
  const state = filtersReducer(undefined, { 
    type: 'SET_END_DATE',
    endDate: date,
  });

  expect(state.endDate).toEqual(date);
});
