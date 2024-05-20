import { drawImage, moveTo } from "../general.js";

export default class Bunny
{
    constructor(ctx, canvas, config, mapSize)
    {
        this.targetPosition = {
            x: 3,
            y: 3
        }
        this.position = {
            x: 3,
            y: 3
        }
        this.absolutePosition = {
            x: config.viewDistance.x,
            y: config.viewDistance.y
        }
        this.targetAbsolutePosition = {
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
        this.smooth = 0.1; // Время анимации
        this.isMoving = true;
        this.cacheMove = {
            x: 0,
            y: 0
        }

        this.levelManager; // Присваивается level manager
    };

    move(dirX, dirY)
    {
        if (!this.isMoving && (dirX != 0 || dirY != 0)){ // Кешируем желаемое движение между паузами
            this.cacheMove.x = dirX;
            this.cacheMove.y = dirY;
            return;
        }
        if (this.targetPosition.x + dirX == this.mapSize.x
            || this.targetPosition.x + dirX < 0
            || this.targetPosition.y + dirY == this.mapSize.y
            || this.targetPosition.y + dirY < 0) return; // Если выходим за границы карты

        if (dirX != 0) this.dirX = dirX;
        
        // Проверка на препятствия | 1 означает препятсвие
        if (this.levelManager.map[this.targetPosition.y + dirY][this.targetPosition.x + dirX] == 1) return;

        this.targetPosition.x += dirX;
        this.targetPosition.y += dirY;
        
        if (this.targetPosition.x + this.config.viewDistance.x >= this.mapSize.x // Если дальность обзора на границе карты
            || this.targetPosition.x - this.config.viewDistance.x < 0)
        {
            this.targetAbsolutePosition.x += dirX;
        }
        else
        {
            this.targetAbsolutePosition.x = this.config.viewDistance.x;
        }
        if (this.targetPosition.y + this.config.viewDistance.y >= this.mapSize.y // Если дальность обзора на границе карты
            || this.targetPosition.y - this.config.viewDistance.y < 0)
        {
            this.targetAbsolutePosition.y += dirY;
        }
        else
        {
            this.targetAbsolutePosition.y = this.config.viewDistance.y;
        }
        this.isMoving = false;
        setTimeout(() => {
            this.isMoving = true;
            if (this.cacheMove.x != 0 || this.cacheMove.y != 0){ // Если есть кешированное направление
                this.move(this.cacheMove.x, this.cacheMove.y);
                this.cacheMove.y = 0;
                this.cacheMove.x = 0;
                console.log("cache");
            }
        }, 180);
    }

    update(lag)
    {
        this.absolutePosition.x = moveTo(this.absolutePosition.x, this.targetAbsolutePosition.x, 1000/lag * this.smooth);
        this.absolutePosition.y = moveTo(this.absolutePosition.y, this.targetAbsolutePosition.y, 1000/lag * this.smooth);
        
        this.position.x = moveTo(this.position.x, this.targetPosition.x, 1000/lag * this.smooth);
        this.position.y = moveTo(this.position.y, this.targetPosition.y, 1000/lag * this.smooth);
        
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