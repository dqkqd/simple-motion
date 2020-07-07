let height = 400;
let width = 1000;
let color = "rgb(130, 130, 130)";

let tree_height = 60;
let tree_width = 10;
let tree_radius = 30;
let tree_distance = 1000;
let object_radius = 20;
let object_height = 0;
let start_pos = 0;

let vx = 5;

let vy_start = 5;
let vy = vy_start;
let ax = 0.1;
let ay = -0.1;

class Background {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.ground = this.height / 5;
    }

    drawCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        document.body.append(this.canvas);
    }

    drawGround() {
        let ctx = this.canvas.getContext("2d");
        ctx.rect(0, this.height - this.ground, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

class Tree {
    constructor(height, width, radius=10) {
        this.height = height;
        this.width = width;
        this.radius = radius
    }

    draw(x, y, ctx) {
        ctx.beginPath();
        // body
        ctx.rect(x, y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
        // head
        ctx.arc(x + this.width/2, y - this.radius + 5, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

class Object {
    constructor(radius, color="rgb(0, 0, 0)") {
        this.radius = radius;
        this.color = color;
    }

    draw(x, y, ctx) {
        ctx.beginPath();
        ctx.arc(x, y - this.radius, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(0, 0, 0)";//color; //color;
        ctx.fill();
        ctx.closePath();
    }
}

let background = new Background(height, width, tree_height, tree_width, tree_radius, tree_distance);
let tree = new Tree(tree_height, tree_width, tree_radius);
let object = new Object(object_radius);
background.drawCanvas();
background.drawGround();


function draw() {
    let ctx = background.canvas.getContext("2d");
    ctx.clearRect(0, 0, background.width, background.height - background.ground);
    for (let pos = start_pos; pos < background.width + tree_distance; pos += tree_distance) {
        tree.draw(pos, background.height - background.ground - tree.height, ctx);
    }
    object.draw(background.canvas.width / 2, background.height - background.ground - object_height, ctx);
    start_pos -= vx;
    vx += ax;

    object_height += vy;
    vy += ay;

    if (object_height < 0) {
        object_height = 0;
        vy = vy_start;
    }
    if (start_pos + tree_width + tree_radius < 0) {
        start_pos += tree_distance;
    }
    // update velocity and acceleration
    ctx.font = "22px Arial";
    ctx.fillText("vx: " + vx.toFixed(1), 20, 30);
    ctx.fillText("ax: " + ax.toFixed(1), 20, 60);
    ctx.fillText("vy: " + vy.toFixed(1), 150, 30);
    ctx.fillText("ay: " + ay.toFixed(1), 150, 60);
    window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);
