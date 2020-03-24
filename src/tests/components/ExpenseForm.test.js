import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('ExpenseForm component should be rendered correctly without expense data', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm component should be rendered correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should render error for invalid form data', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', { preventDefault: () => { } });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should should set description on input', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'New Description' }
  });
  expect(wrapper.state('description')).toBe('New Description');
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should should set note on textarea', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value: 'New Note' }
  });
  expect(wrapper.state('note')).toBe('New Note');
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should should set amount on input', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: '12.34' }
  });
  expect(wrapper.state('amount')).toBe('12.34');
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should should not set amount on invalid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: '12.345' }
  });
  expect(wrapper.state('amount')).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm should call onSubmit prop on valid form data', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', { preventDefault: () => { } });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({ ...expenses[1], id: undefined });
});

test('ExpenseForm should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('ExpenseForm should set calFocus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calFocus')).toEqual(true);
});
