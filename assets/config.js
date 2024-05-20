export default class Config 
{
    constructor()
    {
        this.grid = 48;
        this.viewSize = {
            x: 7,
            y: 7
        };
        this.viewDistance = {
            x: (this.viewSize.x-1)/2,
            y: (this.viewSize.y-1)/2
        }

        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.viewSize.x * this.grid;
        this.canvas.height = this.viewSize.y * this.grid;
    }
}