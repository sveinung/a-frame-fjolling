const cameraElement = document.querySelector('#avatar');
const ballTemplate = document.querySelector('template').content;
const scene = document.querySelector('a-scene');
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
  let ball = document.importNode(ballTemplate, true)
  debugger
  let ballPos = {
    x: Math.random() * 10.0 - 5.0,
    y: Math.random() *  5.0 + 2.0,
    z: Math.random() * 10.0 - 5.0
  }
  let anim = ball.children[0]
  ball.setAttribute('position', ballPos) 
  anim.setAttribute('to', `${ballPos.x} 1 ${ballPos.z}`)
  scene.appendChild(ball)

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

window.addEventListener('trackpadup', dropBall, true)
window.addEventListener('click', dropBall, true)



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