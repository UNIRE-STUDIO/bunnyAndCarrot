import { drawImage } from "../general.js";

export default class Bunny
{
    constructor(ctx, canvas)
    {
        this.position = {
            x: 0,
            y: 0
        }
        this.dirX;
        this.image = new Image();
        this.image.src = "/assets/Bunny.png";
        this.ctx = ctx;
        this.canvas = canvas;
    };

    moveX(dir)
    {
        this.dirX = dir;
        this.bunny.position.x += dir;
    }
    moveY(dir)
    {
        this.bunny.position.y += dir;
    }

    update()
    {

    }

    render(ctx, config)
    {
        let pos = {x: this.position.x * config.grid, y: this.position.y * config.grid};
        
        drawImage(ctx, this.image, pos, {x:config.grid, y:config.grid});
        
        
    }
}