var ctx = document.getElementById('canvas').getContext('2d');
var canvas = document.getElementById('canvas');
var pong_width = 3;
var pong_height = 66;
var ball_width = 20;
var player_y = (400 / 2) - (66 / 2);
var player_x = 10;
var ai_x = 487;
var ai_y = player_y;
var ball_x = 240;
var ball_y = 190;
var ball_down = 0.6;
var ball_right = 1;
var paddle_vel = 0.5;
var up = false;
var down = false;
var left = false;
var right = false;
var player_points = 0;
var ai_points = 0;
var fake_x;
var fake_y;
var fake_down;
var fake_up;
function find_target(ball_down, ball_right, ball_x, ball_y) {
    fake_down = ball_down;
    fake_right = ball_right;
    fake_x = ball_x;
    fake_y = ball_y;
    while (fake_x < 486) {
        if (fake_y <= 0 || fake_y >= 380) {
            fake_down = -fake_down;
        }
        if (fake_x <= 14 && fake_right < 0) {
            fake_right = -fake_right;
        }
        fake_x += fake_right;
        fake_y += fake_down;
    }
    return fake_y;
}
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = true;
  }
  if (event.keyCode === 38) { // UP
    up = true;
  }
  if (event.keyCode === 37) { // LEFT
    left = true;
  }
  if (event.keyCode === 39) { // RIGHT
    right = true;
  }
});

// Listen for keyup events
canvas.addEventListener('keyup', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = false;
  }
  if (event.keyCode === 38) { // UP
    up = false;
  }
  if (event.keyCode === 37) { // LEFT
    left = false;
  }
  if (event.keyCode === 39) { // RIGHT
    right = false;
  }
});
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
function run(){
  ball_x += ball_right;
  ball_y += ball_down;
  if (ball_x > 200 && ball_x < 300) {
      target = find_target(ball_down, ball_right, ball_x, ball_y);
  }
  if (ai_y + (pong_height / 2) < target) {
  	ai_y += paddle_vel;
  } else if (ai_y > 0 && ai_y - paddle_vel >= target) {
  	ai_y -= paddle_vel;
  }
  if (ball_y <= 0 || ball_y + ball_width >= 400) {
		ball_down = -ball_down;
  }
  if (ball_x + ball_width >= 487 && ball_x + (ball_width / 2) < 487 && ball_y + ball_width >= ai_y && ball_y <= ai_y + pong_height && ball_right > 0) {
  	ball_right = -ball_right;
  } else if (ball_x <= 13 && ball_x + (ball_width / 2) >= 13 && ball_y + ball_width >= player_y && ball_y <= player_y + pong_height && ball_right < 0) {
  	ball_right = -ball_right;
  }
  if (down === true && player_y + pong_height < 400) {
  	player_y += paddle_vel;
  }
  if (up === true && player_y > 0) {
  	player_y -= paddle_vel;
  }
  if (ball_x <= -ball_width) {
  	ai_points += 1;
    ball_x = 240;
    ball_y = 190;
	}
  if (ball_x >= 500) {
  	player_points += 1;
    ball_x = 240;
    ball_y = 190;
  }
}
function update(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 400);
  ctx.fillStyle = 'white';
  ctx.fillRect(player_x, player_y, pong_width, pong_height);
  ctx.fillRect(ai_x, ai_y, pong_width, pong_height);
  ctx.fillRect(ball_x, ball_y, ball_width, ball_width);
  ctx.font = "70px Arial";
  ctx.fillText(player_points, 20, 70);
  ctx.fillText(ai_points, 480 - getTextWidth(ai_points, "70px Arial"), 70);
  var line_y = 3;
  var line_width = 4;
  var line_x = 248;
  while (line_y < 400) {
  	ctx.fillRect(line_x, line_y, line_width, 10);
    line_y += 15;
  }
}
setInterval(run, 1)
setInterval(update, 1)
