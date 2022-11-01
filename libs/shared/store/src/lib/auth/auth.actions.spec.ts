import { authSlice } from './auth.slice';

import { authInitialState as defaultState } from '../fixtures/auth.fixtures';
describe('@auth.slice', () => {
  const authReducer = authSlice.reducer;
  // const authActions = authSlice.actions;

  it('should return initial state and be called @auth', async () => {
    const initialState = defaultState;
    const action = { type: 'unknown' };
    const state = authReducer(initialState, action);

    const expectedState = defaultState;

    expect(authSlice.name).toBe('@auth');
    expect(state).toEqual(expectedState);
  });
});
