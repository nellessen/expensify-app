import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses'

test('expenses-total should sum up amounts for several expenses', () => {
  expect(selectExpensesTotal(expenses)).toBe(114195);
});

test('expenses-total should return 0 for empty list', () => {
  expect(selectExpensesTotal([])).toBe(0);
});
