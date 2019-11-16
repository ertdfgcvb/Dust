const THETA = 0.00000001;

class Vec2{

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y){
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    mag() {
        return Math.sqrt((this.x*this.x)+(this.y*this.y));
    }

    magSq() {
        return this.x*this.x + this.y*this.y;
    }

    norm() {
        const m = this.mag();
        if (m < THETA) return new Vec2();
        return new Vec2(this.x/m, this.y/m);
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    mult(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    toString() {
        const scalar = Math.pow(10, 3);
        return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
    }

/*
    equals(v) {
        return((this.x == v.x) && (this.y == v.x));
    }

    normSelf() {
        const m = this.mag();
        if (m < THETA) return;
        this.x /= m
        this.y /= m;
    }

    inv() {
        return new Vec2(-this.x, -this.y);
    }


    addSelf(v){
        this.x += v.x;
        this.y += v.y;
    }

    subSelf(v){
        this.x -= v.x;
        this.y -= v.y;
    }

    multSelf(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    div(scalar) {
        return new Vec2(this.x / scalar, this.y / scalar);
    }

    divSelf(scalar) {
        this.x /= scalar;
        this.y /= scalar;
    }

    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    rotate(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = (this.x * c) - (this.y * s);
        const y = (this.x * s) + (this.y * c);
        return new Vec2(x, y);
    }

    rotateAroundPoint(point, ang) {
        return this.sub(point).rotate(ang).add(point);
    }
*/
}

export default Vec2



