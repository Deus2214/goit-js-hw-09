
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
stopButton.disabled = true;
let timerId = null;



function onStartButtonClick(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);


  event.currentTarget.disabled = true;
  stopButton.removeAttribute('disabled');
}


function onStopButtonClick(event) {
  clearInterval(timerId);

  event.currentTarget.disabled = true;
  startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
