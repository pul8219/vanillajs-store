import { Component } from './core/Component.js';
import { store } from './store.js';

const InputA = () => `<input id="stateA" value="${store.state.a}"/>`;
const InputB = () => `<input id="stateB" value="${store.state.b}"/>`;
const Calculator = () => `<p>a + b = ${store.state.a + store.state.b}</p>`;

export class App extends Component {
  template() {
    return `
            ${InputA()}
            ${InputB()}
            ${Calculator()}
        `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      store.commit('SET_A', Number(target.value));
    });
    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      store.commit('SET_B', Number(target.value));
    });
  }
}
