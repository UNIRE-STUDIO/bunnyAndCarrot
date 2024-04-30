export default class Config 
{
    constructor()
    {
        this.grid = 64;
        this.sizeMap = {
            x: 8,
            y: 8
        };

        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.sizeMap.x * this.grid;
        this.canvas.height = this.sizeMap.y * this.grid;
    }
}