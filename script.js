const cameraElement = document.querySelector('#avatar');
const ball = document.querySelector('#ball');
const jumpAccelerationTreshold = 20;

ball.addEventListener('mouseup', function() {
  this.dispatchEvent(new CustomEvent('throwBall'))
  console.log('yay');
})

let jumping = false;

function jump() {
  if (!jumping) {
    //jumping = true;
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
