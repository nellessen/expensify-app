import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('ExpenseSummary component is rendered correctly with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={1234} />)
  expect(wrapper).toMatchSnapshot();
});

test('ExpenseSummary component is rendered correctly with 2 expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={2} expensesTotal={2468} />)
  expect(wrapper).toMatchSnapshot();
});
