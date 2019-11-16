import Vec2 from './Vec2.js'

class Point{
    constructor(x, y, r){
        this.pos = new Vec2(x, y)
        this.pre = new Vec2(x, y)
        this.radius = r
        this.radius_squared = r * r // for faster distance checks
        this.pinned = false
        this.cell_x = 0
        this.cell_y = 0
    }
}

class Link{
    constructor(a, b, l, k){
        this.a = a
        this.b = b
        this.length = l
        this.k = k
    }
}

class Sim {

    constructor() {
        this.points = []
        this.links = []
        this.friction = 0.9
        this.gravity = new Vec2(0, 0)
    }

    update(steps){
        // points
        for (const p of this.points) {
            let v = p.pos.sub(p.pre)
            v = v.add(this.gravity)
            v = v.mult(this.friction)
            p.pre = p.pos.copy()
            p.pos = p.pos.add(v)
        }

        // links
        const sub_step = 1.0 / steps
        for (let i=0; i<steps; i++){
            for (const l of this.links){
                const v = l.a.pos.sub(l.b.pos)
                const m = v.mag()
                v.multSelf((l.length - m) / m * l.k * sub_step)
                l.a.pos = l.a.pos.add(v)
                l.b.pos = l.b.pos.sub(v)
            }
        }

        // reset pinned
        for (const p of this.points){
            if (p.pinned) p.pos = p.pre.copy()
        }

        // bounds
        //this.bounds()
    }

    addPoint(x, y, r){
        const p = new Point(x, y, r)
        this.points.push(p)
        return p
    }

    addLink(a, b, length = null, k = 0.1){
        if(length === null){
            length = a.pos.sub(b.pos).mag()
        }

        const l = new Link(a, b, length, k)
        this.links.push(l)
        return l
    }

    bounds(height){
        for (const p of this.points){
             if (p.pos.y >= height){
                 const d = (p.pos.y - p.pre.y) * 0.8
                 p.pre.y = height + d
                 p.pos.y = height
             }
        }
    }
}

export default {
    Point,
    Link,
    Sim,
}

