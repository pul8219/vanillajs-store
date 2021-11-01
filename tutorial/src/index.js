// class 발행기관 {
//   #state;
//   #observers = new Set(); // 관찰자들

//   // defineProperty() 객체의 특정 속성을 정의하거나 수정한 후 해당 객체를 반환한다
//   constructor(state) {
//     this.#state = state;
//     Object.keys(state).forEach((key) =>
//       Object.defineProperty(this, key, {
//         get: () => this.#state[key],
//       })
//     );
//   }

//   내부에_변화가_생김(newState) {
//     this.#state = { ...this.#state, ...newState };
//     this.구독자에게_알림();
//   }

//   구독자_등록(subscriber) {
//     this.#observers.add(subscriber);
//   }

//   구독자에게_알림() {
//     this.#observers.forEach((fn) => fn());
//   }
// }

// class 구독자 {
//   #fn;

//   constructor(발행기관에_변화가_생길_때_하는_일) {
//     this.#fn = 발행기관에_변화가_생길_때_하는_일;
//   }

//   구독(publisher) {
//     publisher.구독자_등록(this.#fn);
//   }
// }

// const 상태 = new 발행기관({
//   a: 10,
//   b: 20,
// });

// const 덧셈계산기 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
// const 곱셈계산기 = new 구독자(() => console.log(`a * b = ${상태.a * 상태.b}`));

// // 여기서 상태는 발행기관의 인스턴스일텐데 상태.a 처럼 이렇게 바로 접근할 수 있는 이유는 발행기관 클래스내 defineProperty 관련 코드 때문이다.

// 덧셈계산기.구독(상태);
// 곱셈계산기.구독(상태);

// 상태.구독자에게_알림();

// 상태.내부에_변화가_생김({
//   a: 100,
//   b: 200,
// });

// =================

let currentObserver = null;

// 상태가 바뀌면 자동으로 실행될 함수
const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};

const 상태 = observable({
  a: 10,
  b: 20,
});

observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a + 상태.b}`));
observe(() => console.log(`a * b = ${상태.a * 상태.b}`));

상태.a = 100;
// 예상 출력 결과 작성하기

// 상태.b = 200;
// 예상 출력 결과 작성하기
