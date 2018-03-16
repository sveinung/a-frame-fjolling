const cameraElement = document.querySelector('#avatar');
const remote = document.querySelector('#remote');
const jumpAccelerationTreshold = 20;

let jumping = false;

function jump() {
  if (!jumping) {
    jumping = true;
    cameraElement.dispatchEvent(new CustomEvent('jump'))
    setTimeout(function(){
      jumping = false;
    }, 600)
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    jump();
  }
});

window.addEventListener('devicemotion', (e) => {
  const accel = e.accelerationIncludingGravity;
  if (accel && accel.x > jumpAccelerationTreshold) {
    jump();
  }
}, true);
