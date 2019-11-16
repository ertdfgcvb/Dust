import FPS from './fps.js'
import Pointer from './pointer.js'

function run(){

    // initialize the app
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")
    const pointer = Pointer.init(canvas)

    // main loop
    function loop(time) {

        // resize the canvas
        const width  = ctx.canvas.offsetWidth;   // css size
        const height = ctx.canvas.offsetHeight;
        const ratio  = window.devicePixelRatio
        if (ctx.canvas.width != width || ctx.canvas.height != height){
            ctx.canvas.width = width * ratio
            ctx.canvas.height = height * ratio
        }

        const fps = Math.round(FPS.step(time))
        document.querySelector('#log').innerHTML = "FPS: " + fps

        requestAnimationFrame(loop)
    }

    // start the animation
    requestAnimationFrame(loop)

}

export default {
    run
}
