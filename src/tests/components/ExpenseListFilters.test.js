import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, allFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(<ExpenseListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    />)
});

test('ExpenseListFilters component should be rendered correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseListFilters component should be rendered correctly with alt data', () => {
  wrapper.setProps({ filters: allFilters });
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseListFilters should handle text change', () => {
  wrapper.find('input').simulate('change', { target: { value: 'Text'} });
  expect(setTextFilter).toHaveBeenLastCalledWith('Text');
});

test('ExpenseListFilters should sort by date', () => {
  wrapper.find('select').simulate('change', { target: { value: 'date'} });
  expect(sortByDate).toHaveBeenLastCalledWith();
});

test('ExpenseListFilters should sort by amount', () => {
  wrapper.find('select').simulate('change', { target: { value: 'amount'} });
  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('ExpenseListFilters should handle date changes', () => {
  const startDate = moment();
  const endDate = moment();
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('ExpenseListFilters should handle date focus changes', () => {
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('startDate');
  expect(wrapper.state('calFocus')).toBe('startDate');
});
