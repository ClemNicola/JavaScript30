
// (function() { // IIFE pour s'assurer que le code s'exécute après le chargement du DOM
//   let countdown;
//   const timerDisplay = document.querySelector('.display__time-left');

//   if (!timerDisplay) {
//     console.error('Element .display__time-left not found');
//     return;
//   }

//   function timer(seconds) {
//     const now = Date.now();
//     const then = now + seconds * 1000;
//     displayTimeLeft(seconds); // Afficher le temps initial

//     countdown = setInterval(() => {
//       const secondsLeft = Math.round((then - Date.now()) / 1000);
//       if (secondsLeft < 0) {
//         clearInterval(countdown);
//         return;
//       }
//       displayTimeLeft(secondsLeft);
//     }, 1000);
//   }

//   function displayTimeLeft(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const reminderSeconds = seconds % 60;
//     const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
//     timerDisplay.textContent = display;
//   }

//   // Démarrer un compte à rebours dès que le DOM est prêt
//   timer(300); // par exemple pour un compte à rebours de 5 minutes
// })();


let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const form = document.getElementById('custom')

function timer (seconds) {
  clearInterval(countdown)
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown  = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft)
  }, 1000);
}

function displayTimeLeft(seconds){

  const minutes = Math.floor(seconds / 60);
  const reminderSeconds = seconds % 60;
  const display = `${minutes} : ${reminderSeconds < 10 ? 0 : ""}${reminderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back at ${hours}:${minutes < 10 ? 0 : ""}${minutes}`;
}

function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
}

function submitTime(seconds) {
  seconds.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();

}

buttons.forEach(button => button.addEventListener('click', startTimer))
form.addEventListener('submit', submitTime)
