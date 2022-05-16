const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width = document.documentElement.clientWidth;
const HEIGHT = canvas.height = document.documentElement.clientHeight;

const backgroundColor = "black";

var deltaTime, timeLast = 0;

var camera = new Camera(new Point3D(0, 0, -5));

// Objects
const objects = [new Cube(new Point3D(0, 0, 0), 100)];

document.addEventListener(("keypress"), (evt) => {
    switch (evt.key) {
        case "w":
            camera.position.x -= 5;
            break;
        case "s":
            camera.position.x += 5;
            break;
        case "a":
            camera.position.z -= 5;
            break;
        case "d":
            camera.position.z += 5;
            break;
    }
});

requestAnimationFrame(draw)

function draw(timeNow) {
    deltaTime = timeNow - timeLast;
    timeLast = timeNow;
    let angle = deltaTime * 0.001 * 0.15 * Math.PI * 2;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    objects.forEach(object => {
        object.rotateY(angle)
        object.draw()
    });

    requestAnimationFrame(draw)
}