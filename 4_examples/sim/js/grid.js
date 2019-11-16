function constrain(v, lower, upper){
    if (v < lower) return lower
    if (v > upper) return upper
    return v
}

class Grid {

    constructor(cell_size, width, height){
        this.cell_size = cell_size
        this.max_dist_sq = cell_size * cell_size
        this.resize(width, height)
    }

    resize(width, height){
        this.num_cells_x = Math.ceil(width / this.cell_size) + 1
        this.num_cells_y = Math.ceil(height / this.cell_size) + 1
        this.data = []
        for (let j=0; j<this.num_cells_y; j++){
            this.data[j] = []
            for (let i=0; i<this.num_cells_x; i++){
                this.data[j][i] = []
            }
        }
    }



    // expects an array of {pos{x,y}}
    update(point_data){

        for (let j=0; j<this.num_cells_y; j++){
            for (let i=0; i<this.num_cells_x; i++){
                this.data[j][i].length = 0
            }
        }
        for (const p of point_data) {
            const cell_x = Math.floor(p.pos.x / this.cell_size)
            const cell_y = Math.floor(p.pos.y / this.cell_size)
            p.__cell_x = cell_x
            p.__cell_y = cell_y
            if (cell_x < 0 || cell_y < 0 ||cell_x >= this.num_cells_x || cell_y >= this.num_cells_y) continue
            this.data[cell_y][cell_x].push(p)
        }
    }

    getRegion(x, y){
        if (x < 0 || y < 0 || x >= this.num_cells_x || y >= this.num_cells_y) return []
        return this.data[y][x]
    }
}

export default Grid