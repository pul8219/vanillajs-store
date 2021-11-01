import { Component } from './core/Component.js';
import { setA, setB, store } from './store.js';

const InputA = () => `<input id="stateA" value="${store.getState().a}"/>`;
const InputB = () => `<input id="stateB" value="${store.getState().b}"/>`;
const Calculator = () =>
  `<p>a + b = ${store.getState().a + store.getState().b}</p>`;

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
      // dispatch를 통해 값을 변경한다.
      store.dispatch(setA(Number(target.value)));
    });
    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      // dispatch를 통해 값을 변경한다.
      store.dispatch(setB(Number(target.value)));
    });
  }
}
