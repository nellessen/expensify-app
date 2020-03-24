import uuid from 'uuid';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('expenses reducer should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('expenses reducer should remove expense by ID', () => {
  const state = expensesReducer(expenses, { 
    type: 'REMOVE_EXPENSE',
    id: '2', 
  });

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('expenses reducer should not remove expense if ID not found', () => {
  const state = expensesReducer(expenses, { 
    type: 'REMOVE_EXPENSE',
    id: '-1', 
  });

  expect(state).toEqual(expenses);
});

test('expenses reducer should add expense', () => {
  const expense = {
    id: 999,
    description: 'description',
    note: 'note',
    amount: 123,
    createdAt: 0,
  };

  const state = expensesReducer(expenses, {
    type: 'ADD_EXPENSE',
    expense,
  })

  expect(state).toEqual([...expenses, expense]);
})

test('expenses reducer should edit expense', () => {
  const updates = {
    id: '1',
    description: 'description',
    note: 'note',
    amount: 123,
    createdAt: 0,
  };

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: '1',
    updates: updates
  })

  expect(state).toEqual([updates, ...expenses.slice(1, 3)]);
})

test('expenses reducer should not edit expense if ID not found', () => {
  const updates = {
    id: '1',
    description: 'description',
    note: 'note',
    amount: 123,
    createdAt: 0,
  };

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: updates
  })

  expect(state).toEqual(expenses);
});
