const cameraElement = document.querySelector('#avatar');
const ball = document.querySelector('#ball');
const jumpAccelerationTreshold = 20;

ball.addEventListener('mouseup', function() {
  if (this.components['dynamic-body'].body.velocity.x > 0.1 || 
      this.components['dynamic-body'].body.velocity.y > 0.1 ||
      this.components['dynamic-body'].body.velocity.z > 0.1) {
    this.dispatchEvent(new CustomEvent('throwBall'))
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
