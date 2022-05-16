class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Camera {
    constructor(position) {
        this.position = position;
    }
}

class Cube {
    constructor(position, size) {
        this.position = new Point3D(position.x + WIDTH / 2, position.y + HEIGHT / 2, position.z);
        this.size = size
        this.update()
    }

    rotateX(angle) {
        for (let v of this.vertices) {
            let dy = v.y - this.position.y;
            let dz = v.z - this.position.z;
            let y = dy * Math.cos(angle) - dz * Math.sin(angle);
            let z = dy * Math.sin(angle) + dz * Math.cos(angle);
            v.y = y + this.position.y;
            v.z = z + this.position.z;
        }
    }

    rotateY(angle) {
        for (let v of this.vertices) {
            let dx = v.x - this.position.x;
            let dz = v.z - this.position.z;
            let x = dz * Math.sin(angle) + dx * Math.cos(angle);
            let z = dz * Math.cos(angle) - dx * Math.sin(angle);
            v.x = x + this.position.x;
            v.z = z + this.position.z;
        }
    }

    rotateZ(angle) {
        for (let v of this.vertices) {
            let dx = v.x - this.position.x;
            let dy = v.y - this.position.y;
            let x = dx * Math.cos(angle) - dy * Math.sin(angle);
            let y = dx * Math.sin(angle) + dy * Math.cos(angle);
            v.x = x + this.position.x;
            v.y = y + this.position.y;
        }
    }

    update() {
        this.vertices = [
            new Point3D(this.position.x - this.size, this.position.y - this.size, this.position.z - this.size),
            new Point3D(this.position.x + this.size, this.position.y - this.size, this.position.z - this.size),
            new Point3D(this.position.x + this.size, this.position.y + this.size, this.position.z - this.size),
            new Point3D(this.position.x - this.size, this.position.y + this.size, this.position.z - this.size),
            new Point3D(this.position.x - this.size, this.position.y - this.size, this.position.z + this.size),
            new Point3D(this.position.x + this.size, this.position.y - this.size, this.position.z + this.size),
            new Point3D(this.position.x + this.size, this.position.y + this.size, this.position.z + this.size),
            new Point3D(this.position.x - this.size, this.position.y + this.size, this.position.z + this.size)]
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // back face
            [4, 5], [5, 6], [6, 7], [7, 4], // front face
            [0, 4], [1, 5], [2, 6], [3, 7]]; // connecting sides
    }

    draw() {
        for (let edge of this.edges) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1.15;
            ctx.beginPath();
            ctx.moveTo(this.vertices[edge[0]].x, this.vertices[edge[0]].y);
            ctx.lineTo(this.vertices[edge[1]].x, this.vertices[edge[1]].y);
            ctx.stroke();
        }
    }
}