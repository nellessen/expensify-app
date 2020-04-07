import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, startEditExpense, editExpense, startRemoveExpense, removeExpense, startSetExpenses, setExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuser';
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
  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('removeExpense() should return remove expense action object', () => {
  const action = removeExpense({ id: 'ID' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'ID',
  });
});

test('startRemoveExpense() should remove expense from database and store', (done) => {
  const store = createMockStore({ auth: { uid } });

  store.dispatch(startRemoveExpense(expenses[2])).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'REMOVE_EXPENSE',
      id: expenses[2].id,
    }]);

    return database.ref(`users/${uid}/expenses/${expenses[2].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.exists()).toBeFalsy();
    done();
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

test('startEditExpense() should edit expense in database and store', (done) => {
  const store = createMockStore({ auth: { uid } });
  const updates = {
    description: 'New Description',
    note: 'New Note',
    amount: 999,
    createdAt: 999999,
  };

  store.dispatch(startEditExpense(expenses[0].id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'EDIT_EXPENSE',
      id: expenses[0].id,
      updates,
    }]);

    return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updates);
    done();
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
  const store = createMockStore({ auth: { uid } });
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
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
  const store = createMockStore({ auth: { uid } });

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_EXPENSES',
      expenses,
    }]);

    done();
  });
});
