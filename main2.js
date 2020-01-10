  
 //---------------------------------------------------------------BOUNCING BALL
function jumpBox(interval, canvas) {
    var ctx = canvas.getContext("2d");
    var ballRadius = 20;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var colors = ['#b54681', '#22c8e5', '#21e044', '#f2c668', '#f4f799', '#cd6de8', '#f73d3d', '#f3ffa8', '#ffffff'];
    var color = colors[getRandomInt(0, 9)];

  // Random ball color generator
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  // Draw ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  // Draw direction
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    x += dx;
    y += dy;
  }
  return setInterval(draw, interval);
}

//-------------------------------------------------------------- MAIN GSAP FUNCTION
function GSAP() {
  var borderLine = document.querySelector('.border');
  var mainHead = document.querySelector('.main__head');
  var subHead = document.querySelector('.sub__head');
  var logo = document.querySelector('.svg');
  var stagger = document.querySelector('.stagger__effect');


  //------------------------------------------------------------GSAP ANIMATIONS
  // CIRCLE SPIN
  function circlesSpin() {
  gsap.to(".circ__1", { rotate: 360, x: 100, y: 150, repeat: -1, duration: 13, yoyo: true });
  gsap.to(".circ__2", { rotate: 250, x: 25, y: 40, repeat: -1, duration: 15, yoyo: true });
  gsap.to(".circ__3", { rotate: 250, y: 40, repeat: -1, duration: 16, yoyo: true });
  gsap.to(".circ__4", { rotate: 250, y: 40, repeat: -1, duration: 20, yoyo: true });
  gsap.to(".circ__5", { rotate: 250, y: 40, repeat: -1, duration: 18, yoyo: true });
}


  //----------------------------------------------------------------GSAP STAGGER
function staggersStart() {
    gsap.to('.stagger', { repeat: -1, duration: 0.5, scale: 0, y: 40, ease:"power1.out", yoyo: true, stagger: {
      grid: [1,9],
      from: "left",
      amount: 3
    }});
  }


  //Stagger function
function staggers() {
  $(stagger).on('click', function() {
    var tlThree = gsap.timeline({repeat: 0, yoyo: true});
    tlThree.to('.stagger', { duration: 0.5, opacity: 1, stagger: {
      grid: [1,9],
      from: "center",
      amount: 3
    }})
    .to('.stag__btn', { duration: 2, opacity: 1 });
  });
}
function centerBtn() {
  $('.center__btn').on('click', function() {
    staggersStart();
  }
)
}


 //---------------------------------------------------------------BOUNCING BOX
 function bounceBox() {
   var tlFour = gsap.timeline({repeat: 0});
    tlFour.to('.box__container', { duration: 1, display: "block" })
    .from('.canvas', { y: -1500, rotate: 360, opacity: 0, duration: 3, stagger: 1 })
    .from('.box__head', { opacity: 1, duration: 2, stagger: 1 });
}
function animateBox() {
  var tlFive = gsap.timeline({repeat: -1, repeatDelay: 0.5, yoyo: true});
  var canvas = document.querySelectorAll('.canvas');
  tlFive.to(canvas, { duration: 3, rotate: 360, stagger: {from: "center", amount: 2}, scale: 0.3, borderRadius: "100%"})
  .to(canvas, { duration: 2, boxShadow: "3px 3px 30px red", yoyo: true });
}

function dropBox() {
  $('.box__effect').on('click', function() {
      bounceBox();
  });
  $('.animate').on('click', function() {
    animateBox();
});
}

//-------------------------------------------------------------------FPS COUNT

$('.render').on('click', function() {
  
  var fpsTL = gsap.timeline({repeat: 0});
  var fps = document.querySelector('#fps');

  fpsTL.to(fps, {duration: 5, opacity: 1, ease: "elastic.out(4.5)"});

});

function fpsCount() {
  var fps = document.getElementById("fps"),
    startTime = Date.now(),
    frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1) + ' fps';
      startTime = time;
      frame = 0;
}
  window.requestAnimationFrame(tick);
}
tick();
}





  //--------------------------------------------------------------MAIN TIMELINE
  var tl = gsap.timeline({repeat: 0, repeatDelay: 0.5 });


  //Animate - top border
  tl.from(borderLine, { y: -300, opacity: 0.2, duration: 2, delay: 0.5, });
  tl.to(borderLine, { width: '20%', duration: 1 })
   .to(borderLine, {  duration: 2.5, delay: 0.3, width: '80%', ease: "elastic.out(1, 0.3)" });
   //Animate - top nav
  tl.from(".item, nav", { y: -200, duration: 1.5, stagger: 0.3, opacity: 0, delay: -2 });
  //Animate - heading + subheading
  tl.from(mainHead, {  duration: 3, opacity: 0, delay: 1 })
  .from(subHead, { x: -1200, duration: 1, ease: "back.out(2.5)", delay: 0 });
  //Animation - logo
  tl.from(logo, { y: -200, opacity: 0, ease: "elastic.out(1)", duration: 2, delay: 0 });
  //Animate - circles
  tl.to(".circle", { opacity: 0.3, duration: 5, delay: 0.7 });
  // Animate - logo loop
  tl.to(logo, { duration: 2, scale: 1.1, ease: "elastic", yoyo: true, repeat: -1, delay: 0.5 });

  staggers();
  circlesSpin();
  centerBtn();
  dropBox();
  fpsCount();
}



//-------------------------------------------------------------------ON LOAD
$(document).ready(function() {

arr = document.getElementsByClassName('canvas');
// Loop through jumpBox 

for (var i = 0; i < arr.length; i += 1){
jumpBox(arr[i].dataset.interval, arr[i]);
}
GSAP();


/* $('.canvas').each(function(){
  //jumpBox($(this).data('interval'), $(this)[0]);
}); */
});
