// import { Component } from './core/Component.js';

// export class App extends Component {
//   initState() {
//     return {
//       a: 10,
//       b: 20,
//     };
//   }

//   template() {
//     const { a, b } = this.state;
//     return `
//         <input id="stateA" value="${a}" />
//         <input id="stateB" value="${b}" />
//         <p>a + b = ${a + b}</p>
//         `;
//   }

//   setEvent() {
//     const { $el, state } = this;

//     $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
//       state.a = Number(target.value);
//     });

//     $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
//       state.b = Number(target.value);
//     });
//   }
// }

import { Component } from './core/Component.js';
import { store } from './store.js';

const InputA = () => `<input id="stateA" value="${store.state.a}"/>`;
const InputB = () => `<input id="stateB" value="${store.state.b}"/>`;
const Calculator = () => `<p>a + b = ${store.state.a + store.state.b}</p>`;

export class App extends Component {
  // initState() {
  //   return {
  //     a: 10,
  //     b: 20,
  //   };
  // }

  template() {
    // const { a, b } = this.state;
    // return `
    //     <input id="stateA" value="${a}" />
    //     <input id="stateB" value="${b}" />
    //     <p>a + b = ${a + b}</p>
    //     `;
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    // const { $el, state } = this;
    // $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
    //   state.a = Number(target.value);
    // });
    // $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
    //   state.b = Number(target.value);
    // });

    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      store.setState({ a: Number(target.value) });
    });
    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      store.setState({ b: Number(target.value) });
    });
  }
}
