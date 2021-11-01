import { observable } from './observer.js';

export const createStore = (reducer) => {
  // reducer가 실행될 때 리턴하는 객체(state)를 observable로 만든다.
  const state = observable(reducer());

  // getState가 실제 state가 아니라 frozenState를 반환하도록 만든다.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key], // get만 정의해서 set을 하지 못하도록 한다.
    });
  });

  // state는 dispatch로만 변경할 수 있도록 한다.
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue; // state에 있는 key가 아닐 경우 변경을 생략한다.
      state[key] = value;
    }
  };

  const getState = () => frozenState;

  // subscribe는 observe로 대체한다.
  return { dispatch, getState };
};
