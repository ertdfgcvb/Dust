import FPS from './fps.js'
import Pointer from './pointer.js'
import Image from './image.js'

class Part {

    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.dx = x
        this.dy = y
        this.r = r
    }
}

function run(){

    const img = Image.load("assets/k.png", function(){


        for (let j=0; j<img.canvas.height; j++) {
            for (let i=0; i<img.canvas.width; i++) {
                const c = img.getColor(i, j)
                if (c.r >= 20) {
                    const p = new Part(i*10, j*10, c.r * 0.025)
                    particles.push(p)
                }
            }
        }

        // start the animation
        requestAnimationFrame(loop)
    })



    // initialize the app
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    const pointer = Pointer.init(canvas)


    const particles = []




    // main loop
    function loop(time) {

        // resize the canvas
        const width  = ctx.canvas.offsetWidth;   // css size
        const height = ctx.canvas.offsetHeight;
        const ratio  = Math.floor(window.devicePixelRatio)
        if (ctx.canvas.width != width * ratio|| ctx.canvas.height != height * ratio){
            ctx.canvas.width = width * ratio
            ctx.canvas.height = height * ratio
        }

        // update data
        for (let p of particles) {

            const delta_x = p.dx - pointer.x
            const delta_y = p.dy - pointer.y

            const dist = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2))

            if(dist < 50){
                p.dx += delta_x / dist * (50 - dist)
                p.dy += delta_y / dist * (50 - dist)
            }

            p.x += (p.dx - p.x) * 0.1
            p.y += (p.dy - p.y) * 0.1

        }

        // rendering

        ctx.save()

        ctx.scale(ratio, ratio)
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = 'rgb(255, 255, 255)'


        for (let p of particles) {
            ctx.beginPath()
            ctx.ellipse(p.x, p.y, p.r, p.r, 0, 0, Math.PI * 2)
            ctx.fill()

            // ctx.beginPath()
            // ctx.ellipse(p.dx, p.dy, 14, 14, 0, 0, Math.PI * 2)
            // ctx.stroke()
        }

        ctx.restore()

        let out = ""
        out += "FPS           : " + Math.round(FPS.step(time)) + "\n"
        out += "num particles : " + particles.length + "\n"
        document.querySelector('#log').innerHTML = out

        requestAnimationFrame(loop)
    }



}

export default {
    run
}
