const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const c = canvas.getContext("2d");

let fullWidth = window.innerWidth;
let mouseX;
let mouseY;
let circlesCount = fullWidth / 2.5;
let minRadius = 5;
let maxRadius = fullWidth / 11;
// // Rect
// c.fillStyle = '#e4e4e4'
// c.fillRect(canvas.width * 0.45, canvas.height * 0.4, 100, 100)

// // Line
// c.beginPath()
// c.moveTo(canvas.width * 0.45, canvas.height * 0.4)
// c.lineTo(958, 800)
// c.strokeStyle = '#efefef';
// c.stroke()

// // Arc/Circle
// function randomArcs() {
// var x = Math.floor(Math.random() * window.innerWidth)
// var y = Math.floor(Math.random() * window.innerHeight)
// c.beginPath()
// c.arc(x, y, 100, 0, Math.PI * 2)
// c.strokeStyle = 'rgb(202, 62, 62)';
// c.stroke()
// }

// function hey() {
//     document.addEventListener('mousemove', function(e){
//         let x = e.clientX
//         let y = e.clientY
//         console.log(x, y)
//         c.beginPath()
//         c.arc(x, y, 100, 0, Math.PI * 2)
//         c.strokeStyle = 'rgb(202, 62, 62)';
//         c.stroke()
//     })
// }

// setTimeout(hey, 5000)

// setInterval(randomArcs, 100)

window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("touchmove", function (e) {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
  e.preventDefault();
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fullWidth = window.innerWidth;

  initCircle();
});

class Circle {
  constructor(x, y, dx, dy, radius, color, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.fill = fill;
    this.minRadius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = this.color;
    c.fillStyle = this.fill;
    c.fill();
    c.stroke();
  }

  moveCircle() {
    this.draw();
    if (this.x + this.radius >= innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    //Interactivity
    if (
      mouseX - this.x < 100 &&
      mouseX - this.x > -100 &&
      mouseY - this.y < 100 &&
      mouseY - this.y > -100
    ) {
      if (this.radius < maxRadius) {
        this.radius += 8;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

var circleArray = [];

function initCircle() {
  circleArray = [];

  for (let i = 0; i < circlesCount; i++) {
    let min = Math.ceil(2);
    let max = Math.floor(20);
    let radius = Math.floor(Math.random() * (max - min) + min);
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    let fillArray = ["#977EF2", "#2955D9", "#0597F2", "#F25C05", "#F24C3D"];
    let fill = fillArray[Math.floor(Math.random() * 3)];
    let color = "white";
    circleArray.push(new Circle(x, y, dx, dy, radius, color, fill));
  }
}

initCircle();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // c.font = "30px Arial"
  // c.fillText(circlesCount, fullWidth * .40, 200)

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].moveCircle();
  }
}
animate();
