import { drawImage } from "../general.js";

export default class Bunny
{
    constructor(ctx, canvas, config, mapSize)
    {
        this.position = {
            x: 3,
            y: 3
        }
        this.absolutePosition = {
            x: config.viewDistance.x,
            y: config.viewDistance.y
        }
        this.dirX;
        this.image = new Image();
        this.image.src = "assets/Bunny.png";
        this.ctx = ctx;
        this.canvas = canvas;
        this.config = config;
        this.mapSize = mapSize;
    };

    move(dirX, dirY)
    {
        if (this.position.x + dirX == this.mapSize.x
            || this.position.x + dirX < 0
            || this.position.y + dirY == this.mapSize.y
            || this.position.y + dirY < 0) return; // Если выходим за границы карты

        if (dirX != 0) this.dirX = dirX; 
        
        this.position.x += dirX;
        this.position.y += dirY;
        if (this.position.x + this.config.viewDistance.x >= this.mapSize.x // Если дальность обзора на границе карты
            || this.position.x - this.config.viewDistance.x < 0)
        {
            this.absolutePosition.x += dirX;
        }
        else
        {
            this.absolutePosition.x = this.config.viewDistance.x;
        }
        if (this.position.y + this.config.viewDistance.y >= this.mapSize.y // Если дальность обзора на границе карты
            || this.position.y - this.config.viewDistance.y < 0)
        {
            this.absolutePosition.y += dirY;
        }
        else
        {
            this.absolutePosition.y = this.config.viewDistance.y;
        }
    }

    update()
    {

    }

    render()
    {
        let pos = {x: this.absolutePosition.x * this.config.grid, y: this.absolutePosition.y * this.config.grid};
        if (this.dirX < 0)
        {
            this.ctx.save();
            this.ctx.translate(this.canvas.width, 0);
            this.ctx.scale(-1,1);                       // Отражаем изображение 
            drawImage(this.ctx, this.image, {x: this.canvas.width - pos.x - this.config.grid, y: pos.y}, {x:this.config.grid, y:this.config.grid});
            this.ctx.restore();
            return;
        }
        drawImage(this.ctx, this.image, pos, {x:this.config.grid, y:this.config.grid});
    }
}