const cameraElement = document.querySelector("#avatar");

let jumping = false;

function jump() {
  if (!jumping) {
    jumping = true;
    cameraElement.dispatchEvent(new CustomEvent('jump'));
    setTimeout(() => {
      jumping = false;
    }, 500);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    jump();
  }
});

window.addEventListener('devicemotion', (e) => {
  const accel = e.accelerationIncludingGravity;
  
  const accelerationThreshold = 20;
  if (accel && accel.x > accelerationThreshold) {
    jump();
  }
});
