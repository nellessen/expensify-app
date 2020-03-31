import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = {
      description,
      note,
      amount,
      createdAt,
    }
  });
  database.ref('expenses').set(expenseData).then(() => done());
});

test('removeExpense() should return remove expense action object', () => {
  const action = removeExpense({ id: 'ID' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'ID',
  });
});

test('editExpense() should return edit expense action object', () => {
  const action = editExpense('ID', { changes: 'TEST' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'ID',
    updates: { changes: 'TEST' },
  });
});

test('addExpense() should return add expense action object', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

test('startAddExpense() should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    note: 'note',
    amount: 1234,
    createdAt: 1000,
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData,
      }
    }]);

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('startAddExpense() should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpenseData,
      }
    }]);

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpenseData);
    done();
  });
});

test('setExpenses() should return set expense action object', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

test('startSetExpenses() should add expense from database to store', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_EXPENSES',
      expenses,
    }]);

    done();
  });
});
