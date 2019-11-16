import FPS from './fps.js'
import Pointer from './pointer.js'
import Image from './image.js'

function run(){

    const MAX_NUM = 10
    const TAU = Math.PI * 2

    const points = new Float32Array(MAX_NUM * 3)

    const canvas  = document.querySelector('canvas')
    const gl = canvas.getContext('webgl')
    const pointer = Pointer.init(canvas)

    let shader_program
    const glBuffer = gl.createBuffer()

    const tex = Image.load("assets/donut_128_w.png", function(){
        start()
        requestAnimationFrame(loop)
    })

    function start(){

        // --- Shaders ------------------
        const vs = `
            uniform vec2 screen_size;
            uniform float pixel_ratio;
            uniform float screen_aspect;
            attribute vec3 a_sprite_pos;
            void main() {
                vec4 screenTransform = vec4(2.0 / screen_size.x, -2.0 / screen_size.y, -1.0, 1.0);
                gl_Position  = vec4(a_sprite_pos.xy * screenTransform.xy + screenTransform.zw, 0.0, 1.0);
                //gl_Position = vec4(a_sprite_pos.x * screen_aspect, a_sprite_pos.y,  0.0, 1.0);
                gl_PointSize = a_sprite_pos.z * pixel_ratio;
            }
        `;

        const fs = `
            precision mediump float;
            uniform sampler2D spriteTexture;
            void main() {

                vec4 col = texture2D(spriteTexture, gl_PointCoord);
                gl_FragColor = col;
            }
        `;

        function loadShader(gl, type, source) {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)

            const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
            if (!status) {
                throw new TypeError(`Shader ERROR:\n${gl.getShaderInfoLog(shader)}`)
            }
            return shader
        }

        const vertex_shader   = loadShader(gl, gl.VERTEX_SHADER, vs)
        const fragment_shader = loadShader(gl, gl.FRAGMENT_SHADER, fs)

        shader_program = gl.createProgram()
        gl.attachShader(shader_program, vertex_shader)
        gl.attachShader(shader_program, fragment_shader)
        gl.linkProgram(shader_program)

        const status = gl.getProgramParameter(shader_program, gl.LINK_STATUS)
        if (!status) {
            throw new TypeError(`Shader ERROR (status=${status}): ${gl.getProgramInfoLog(shader_program)}`)
        }

        gl.useProgram(shader_program)


        // --- Buffers ------------------
        const glTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, glTexture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.canvas)
        gl.generateMipmap(gl.TEXTURE_2D)

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }


    function loop( time ) {

        // --- Resize ------------------
        const ratio  = window.devicePixelRatio
        const w = Math.floor(gl.canvas.clientWidth)
        const h = Math.floor(gl.canvas.clientHeight)

        if (gl.canvas.width != w * ratio || gl.canvas.height != h * ratio){
            gl.canvas.width = w * ratio
            gl.canvas.height = h * ratio
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.uniform2f(gl.getUniformLocation(shader_program, 'screen_size'), w, h)
            gl.uniform1f(gl.getUniformLocation(shader_program, 'screen_aspect'), h / w)
            gl.uniform1f(gl.getUniformLocation(shader_program, 'pixel_ratio'), ratio)
        }

        // --- Update ------------------
        points.fill(0)

        for (let i=0; i<MAX_NUM; i++){
            const ang = TAU / MAX_NUM * i + time * 0.001
            const r = (Math.cos(TAU / MAX_NUM * i * time * 0.001) + 1) * 100 + 100
            const x = w / 2 + Math.cos(ang) * r
            const y = h / 2 + Math.sin(ang) * r

            points[i*3    ] = x
            points[i*3 + 1] = y
            points[i*3 + 2] = 50
        }


        // --- Send data ------------------
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.DYNAMIC_DRAW)  // upload data

        const loc = gl.getAttribLocation(shader_program, 'a_sprite_pos')
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(
            loc,
            3,          // x, y, radius
            gl.FLOAT,   // vec3 contains floats
            false,      // ignored
            0,          // each value is next to each other
            0           // starts at start of array
        )

        // --- Draw ------------------
        gl.clearColor(0.6, 0, 0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.POINTS, 0, MAX_NUM)


        // --- Stats ------------------
        const fps = Math.round(FPS.step(time))
        document.querySelector('#log').innerHTML = "FPS: " + fps

        requestAnimationFrame(loop)
    }



}

export default {
    run
}
