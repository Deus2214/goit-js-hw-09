
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const timerContainer = document.querySelector('.timer');

startButton.addEventListener('click', onStartButtonClick);
startButton.disabled = true;
let chosenTime = null;
let deltaTime = null;
let timerId = null;


const flatpickRef = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
 
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    setTimeout(() => {
 
      if (selectedDates[0].getTime() < Date.now()) {
       
        Notiflix.Notify.failure('Please choose a date in the future');
        return;
      }
      startButton.removeAttribute('disabled');
      chosenTime = selectedDates[0];
    }, 0);
  },
});


function onStartButtonClick(event) {
  event.currentTarget.disabled = true;

 
  timerId = setInterval(() => {
    deltaTime = chosenTime.getTime() - Date.now();

    
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    
    if (deltaTime <= 0) {
      clearInterval(timerId);
      flatpickRef.element.disabled = false;
    } else {
      updateTimer({ days, hours, minutes, seconds });
    }
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {

  timerContainer.firstElementChild.firstElementChild.textContent =
    addLeadingZero(`${days}`);
  timerContainer.children[1].firstElementChild.textContent = addLeadingZero(
    `${hours}`
  );
  timerContainer.children[2].firstElementChild.textContent = addLeadingZero(
    `${minutes}`
  );
  timerContainer.lastElementChild.firstElementChild.textContent =
    addLeadingZero(`${seconds}`);

  
  flatpickRef.element.disabled = true;
}

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);
 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}