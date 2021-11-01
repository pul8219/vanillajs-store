import { observable } from './observer.js';
export class Store {
  // private으로 설정해서 외부에서 접근 불가능하도록
  #state;
  #mutations;
  #actions;

  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, {
        get: () => this.#state[key],
      });
    });
  }

  commit(action, payload) {
    // state는 오직 commit -> mutations를 통해서만 수정할 수 있다.
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    return this.#actions[action](
      {
        state: this.#state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
