let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

let colors = [
  "#03045E",
  "#023E8A",
  "#0077B6",
  "#0096C7",
  "#00B4D8",
  "#48CAE4",
  "#90E0EF",
  "#ADE8F4",
  "#CAF0F8",
];
let mouse = {
  x: undefined,
  y: undefined,
};

let maxDist = 100;
let arrayLength = 400;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Cursor Location

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", function (e) {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
  init();
});

//Object
function Circles(x, y, radius, dx, dy, color, minRadius, maxRadius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.stroke();
  };

  this.update = function () {
    if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    //let fillColor = false;
    let dist = ((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2) ** 0.5;
    if (dist < maxDist) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius + 2) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let CircleArray = [];

function init() {
  CircleArray = [];
  for (let i = 0; i < arrayLength; i++) {
    let radius = Math.random() * 5;
    let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
    let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let color = colors[Math.floor(Math.random() * colors.length)];
    let maxRadius = Math.random() * 30 + 30;

    CircleArray.push(
      new Circles(x, y, radius, dx, dy, color, radius, maxRadius)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < CircleArray.length; i++) {
    CircleArray[i].update();
  }
}
animate();
init();
console.log(canvas);
