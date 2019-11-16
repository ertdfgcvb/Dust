function load (url, callback) {

    const img = new Image()
    img.src = url

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        if ( typeof callback === 'function'){
            callback()
        }

    }

    img.onerror = function(e){
        console.log("Problem loading image: " + url)
    }

    function getColor(x, y) {
        const pixel = ctx.getImageData(x, y, 1, 1)
        const data = pixel.data

        return {
            r : data[0],
            g : data[1],
            b : data[2],
            a : data[3]
        }
    }

    function getCSS(x, y){
        const color = getColor(x, y)
        return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + (color.a / 255) + ')';
    }

    return {
        img,
        ctx,
        canvas,
        getColor,
        getCSS
    }
}

export default {
    load
}