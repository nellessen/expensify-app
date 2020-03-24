import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('removeExpense() should return remove expense action object', () => {
  const action = removeExpense({ id: 'ID' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'ID',
  });
});

test('editExpense() should return edit expense action object', () => {
  const action = editExpense('ID', { changes: 'TEST'});

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'ID',
    updates: { changes: 'TEST'},
  });
});

test('addExpense() should return add expense action object', () => {
  const expenseData = {
    description: 'Something',
    amount: 12345,
    createdAt: 1000,
    note: 'This was las months rent'
  }
  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test('addExpense() should return add expense action object with defaults', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      amount: 0,
      createdAt: 0,
      note: ''
    },
  });
});