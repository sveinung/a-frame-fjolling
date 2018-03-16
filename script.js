const cameraElement = document.querySelector('#avatar').querySelector('[camera]');
const ball = document.querySelector('#ball');
const jumpAccelerationTreshold = 20;
let ballInSpace = true

ball.addEventListener('mouseup', function() {
  if (this.components['dynamic-body'].body.velocity.x > 0.1 || 
      this.components['dynamic-body'].body.velocity.y > 0.1 ||
      this.components['dynamic-body'].body.velocity.z > 0.1) {
    this.dispatchEvent(new CustomEvent('throwBall'))
    setTimeout(function(){ 
      ball.setAttribute('visible', 'false')
    }, 10000)
  }
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

function resetBall() {
  if (!ballInSpace) {
    ballInSpace = true
    ball.setAttribute('position', '0 0.7 -1')
    ball.setAttribute('visible', 'true')
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

window.addEventListener('trackpadup', resetBall, true)
window.addEventListener('click', resetBall, true)

