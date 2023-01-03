import flatpickr from 'flatpickr'; 
import { Report } from 'notiflix/build/notiflix-report-aio'; 

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';


const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let futureTime = null;
let intervalId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime();
    const startTime = Date.now();
    const deltaTime = futureTime - startTime;
    if (deltaTime > 0) {
      startBtn.removeAttribute('disabled');
    } else {
      Report.failure('Please choose a date in the future', '', 'Okey');
      startBtn.setAttribute('disabled', true);
    }
  },
};
flatpickr('#datetime-picker', options); 

const timer = {
  start() {
    intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = futureTime - startTime;

      const time = convertMs(deltaTime);
      deltaTime < 0 ? clearInterval(intervalId) : updateClockFace(time);
    }, 1000);

    startBtn.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
  },
};


startBtn.addEventListener('click', timer.start.bind(timer));


startBtn.setAttribute('disabled', true);



function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = addLeadingZero(Math.floor(ms / day));
 
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
 
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
 
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
