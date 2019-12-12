  // BOUNCING BALL
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

// MAIN GSAP FUNCTION
function GSAP() {
  var borderLine = document.querySelector('.border');
  var mainHead = document.querySelector('.main__head');
  var subHead = document.querySelector('.sub__head');
  var logo = document.querySelector('.svg');

  // GSAP ANIMATIONS
  // GSAP functions
  function circlesSpin() {
  gsap.to(".circ__1", { rotate: 360, x: 100, y: 150, repeat: -1, duration: 13, yoyo: true });
  gsap.to(".circ__2", { rotate: 250, x: 25, y: 40, repeat: -1, duration: 15, yoyo: true });
  gsap.to(".circ__3", { rotate: 250, y: 40, repeat: -1, duration: 16, yoyo: true });
  gsap.to(".circ__4", { rotate: 250, y: 40, repeat: -1, duration: 20, yoyo: true });
  gsap.to(".circ__5", { rotate: 250, y: 40, repeat: -1, duration: 18, yoyo: true });
}

  function projects() {

        var tlTwo = gsap.timeline({repeat: 0});

        tlTwo.to(logo, { duration: 2, y: -200, opacity: 0, ease: "bounce.in(3)" })
        .to('.item, nav', { duration: 1.5, y: -200, opacity: 0, stagger: 0.3 })
        .to(mainHead, { duration: 1, opacity: 0, delay: -2 })
        .to(subHead, { duration: 1, x: -1200, opacity: 0, scale: 0.1 })
        .to(borderLine, { duration: 2.5, rotate: 90, delay: 0.5, width: '0%' });
  
  }


  //Timeline
  var tl = gsap.timeline({repeat: 0, repeatDelay: 0.5 });
  //General variables
 

  //Animate - top border
  tl.from(borderLine, { y: -300, opacity: 0.2, duration: 2, delay: 0.5, });
  tl.to(borderLine, { width: '20%', duration: 1 })
   .to(borderLine, { rotate: 360, duration: 1, delay: 0.3  })
   .to(borderLine, { width: '80%', duration: 2.5, delay: 0.5 });
   //Animate - top nav
  tl.from(".item, nav", { y: -200, duration: 1.5, stagger: 0.3, opacity: 0, delay: -2 });
  //Animate - heading + subheading
  tl.from(mainHead, {  duration: 3, opacity: 0, delay: 1 })
  .from(subHead, { x: -1200, duration: 1, ease: "back.out(2.5)" });
  //Animation - logo
  tl.from(logo, { y: -200, opacity: 0, ease: "elastic.out(1)", duration: 2, delay: 2 });
  //Animate - circles
  tl.to(".circle", { opacity: 0.3, duration: 5, delay: 0.7 });
  // Animate - logo loop
  tl.to(logo, { duration: 2, scale: 1.1, ease: "elastic", yoyo: true, repeat: -1, delay: 0.5 });

  circlesSpin();
  $('.projects').on('click', function() {
      projects();
  });

}

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
