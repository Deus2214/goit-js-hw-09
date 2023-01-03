// Завдання 3 - генератор промісів
// Виконуй це завдання у файлах 03-promises.html і 03-promises.js.
// Подивися демо - відео роботи генератора промісів.

// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах,
// крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.

// <form class="form">
//   <label>
//     First delay (ms)
//     <input type="number" name="delay" required />
//   </label>
//   <label>
//     Delay step (ms)
//     <input type="number" name="step" required />
//   </label>
//   <label>
//     Amount
//     <input type="number" name="amount" required />
//   </label>
//   <button type="submit">Create promises</button>
// </form>

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount.
// Під час кожного виклику передай їй номер промісу(position), що створюється,
// і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
// який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт,
// в якому будуть властивості position і delay зі значеннями однойменних параметрів.
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// Бібліотека повідомлень
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.

import Notiflix from 'notiflix';

const formInputRef = document.querySelector('.form');

formInputRef.addEventListener('submit', onSubmitButtonClick);

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount.
function onSubmitButtonClick(event) {
  event.preventDefault();

  let firstDelay = Number(event.currentTarget.delay.value);
  const stepDelay = Number(event.currentTarget.step.value);
  const amountIteration = Number(event.currentTarget.amount.value);

  // Під час кожного виклику передай їй номер промісу(position), що створюється,
  // і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).
  for (let i = 1; i <= amountIteration; i += 1) {
    // Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        // Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        // Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });

    firstDelay += stepDelay;
  }
}

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
// який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт,
// в якому будуть властивості position і delay зі значеннями однойменних параметрів.
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolved({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}