let fps = 0
let frames = 0
let ptime = 0

const update_rate = 1000

export default {
    step : function(time){
        if ( time >= ptime + update_rate ) {
            fps = frames * update_rate  / ( time - ptime )
            ptime = time
            frames = 0
        }
        frames++
        return fps
    }
}
