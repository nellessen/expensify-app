import authReducer from '../../reducers/auth';

test('auth reducer should set uid on login', () => {
  const state = authReducer({}, { type: 'LOGIN', uid: 'UID' });

  expect(state).toEqual({
    uid: 'UID'
  });
});

test('auth reducer should unset uid on logout', () => {
  const state = authReducer({ uid: 'UID' }, { type: 'LOGOUT' });

  expect(state).toEqual({});
});