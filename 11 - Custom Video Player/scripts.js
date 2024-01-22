const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar= player.querySelector('.progress__filled')
const btnToggle = player.querySelector('.toggle')
const skipBtns = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

// Functions

function togglePlay () {
 const method = video.paused? 'play' : 'pause';
 video[method]();
}

function updateButton () { 
  const icon = this.paused ? '►' : '❚ ❚';
  btnToggle.textContent = icon;
}

function skip () {
  video.currentTime += parseFloat(this.dataset.skip)
}

function rangeUpdate () {
  video[this.name] = this.value;
}


function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime
}
// Event Listener

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

btnToggle.addEventListener('click', togglePlay);

skipBtns.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false );
