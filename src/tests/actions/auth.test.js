import { login, logout } from '../../actions/auth';

test('login() should return add login action object', () => {
  const action = login('UID');

  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'UID',
  });
});

test('logout() should return add logout action object', () => {
  const action = logout();

  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
