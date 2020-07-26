var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var context = canvas.getContext("2d");
var mouseDown = false;
var radius = 3;
var colors = [
    '#0074D9',
    '#2ECC40',
    '#FFDC00',
    '#FF851B',
    '#FF4136',
    '#B10DC9',
    '#111111',
    '#DDDDDD'
];
context.fillStyle = '#0074D9';
context.strokeStyle = '#0074D9';
context.lineWidth = 2 * radius;

document.getElementById("radControl").innerText = radius;

window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context.lineWidth = 2 * radius;
});

function changeColor(e) {
    document.getElementsByClassName("active")[0].className = "swatch";
    e.target.className = "swatch active";
    var color = e.target.style.backgroundColor;
    context.fillStyle = color;
    context.strokeStyle = color;
}

for (var i = 0, n = colors.length; i < n; i++) {
    var swatch = document.createElement("div");
    swatch.style.backgroundColor = colors[i];
    swatch.addEventListener("click", changeColor);
    if (i == 0) {
        swatch.className = "swatch active";
    } else {
        swatch.className = "swatch";
    }
    document.getElementById("colors").appendChild(swatch);
}

document.getElementById("increase").addEventListener("click", function () {
    if (radius < 50) {
        radius++;
        context.lineWidth = 2 * radius;
        document.getElementById("radControl").innerText = radius;
    }
});

document.getElementById("decrease").addEventListener("click", function () {
    if (radius > 1) {
        radius--;
        context.lineWidth = 2 * radius;
        document.getElementById("radControl").innerText = radius;
    }
});

function draw(e) {
    if (mouseDown) {
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.arc(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, radius, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", function () {
    mouseDown = false;
    context.beginPath();
});

canvas.addEventListener("mousedown", function (e) {
    mouseDown = true;
    draw(e);
});

