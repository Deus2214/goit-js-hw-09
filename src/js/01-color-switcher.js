// Завдання 1 - перемикач кольорів
// Виконуй це завдання у файлах 01-color-switcher.html і 01-color-switcher.js.
// Подивися демо-відео роботи перемикача.

// HTML містить кнопки «Start» і «Stop».
// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону <body> на випадкове значення,
// використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.
// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
stopButton.disabled = true;
let timerId = null;

// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону <body> на випадкове значення,
// використовуючи інлайн стиль.
function onStartButtonClick(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  // Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
  // Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
  event.currentTarget.disabled = true;
  stopButton.removeAttribute('disabled');
}

// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
function onStopButtonClick(event) {
  clearInterval(timerId);

  event.currentTarget.disabled = true;
  startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
