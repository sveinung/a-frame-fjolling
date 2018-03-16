const cameraElement = document.querySelector('#avatar');
const ball = document.querySelector('#ball');
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

function dropBall() {
  let ballPos = ball.getAttribute('position')
  let anim = ball.children[0]
  anim.setAttribute('to', `${ballPos.x} 1 ${ballPos.z}`)

  ball.dispatchEvent(new CustomEvent('drop'))
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

//window.addEventListener('grab-end', dropBall, true)
//window.addEventListener('click', dropBall, true)



// this is the listener we would use if we were using physics
// ball.addEventListener('mouseup', function() {
//   if (this.components['dynamic-body'].body.velocity.x > 0.1 || 
//       this.components['dynamic-body'].body.velocity.y > 0.1 ||
//       this.components['dynamic-body'].body.velocity.z > 0.1) {
//     this.dispatchEvent(new CustomEvent('throwBall'))
//     setTimeout(function(){ 
//       ball.setAttribute('visible', 'false')
//       ballInSpace = false
//     }, 10000)
//   }
// })