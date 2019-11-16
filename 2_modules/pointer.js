

const hasTouch = 'ontouchstart' in document.documentElement


export default {

    init : function(element) {

        const pointer = {
            x  : 0,
            y  : 0,
            px : 0,
            py : 0,
            pressed : false,
            hasTouch
        }

        function press(x, y){
            pointer.pressed = true;
            pointer.x = x;
            pointer.y = y;
        }

        function move(x, y){
            pointer.x  = x;
            pointer.y  = y;
        }

        function release(x, y){
            pointer.pressed = false;
        }

        if (hasTouch) {
            element.addEventListener("touchstart", function(e) {
                press(e.touches[0].clientX, e.touches[0].clientY);
            });
            element.addEventListener("touchmove", function(e) {
                move(e.touches[0].clientX, e.touches[0].clientY);
            });
            element.addEventListener("touchend", function(e) {
                release(e.touches[0].clientX, e.touches[0].clientY)
            });
        } else {
            element.addEventListener('mousedown', function(e){
                press(e.clientX, e.clientY);
            });
            element.addEventListener('mousemove', function(e){
                move(e.clientX, e.clientY);
            });
            element.addEventListener('mouseup', function(e){
                release(e.clientX, e.clientY);
            });
        }

        return pointer
    }
}