import { drawImage } from "../general.js";
import SaveManager from "../saveManager.js";
import Bunny from "./bunny.js";

export default class LevelManager
{
    constructor(input, config)
    {
        // куда-то
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timeUpdate = 0;
        
        this.score = 0;

        this.isPause = false;

        // Присваивает класс Game
        this.gameOverEvent;
        this.saveManager;


        this.map = [[0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [1,0,0,0,0,1,1,0,0,1],
                    [1,1,0,0,0,1,1,0,1,1]];
        this.tiles = [new Image(), new Image()];
        this.tiles[0].src = "assets/Grass.png";
        this.tiles[1].src = "assets/Watter2.png";
        
        this.config = config;
        
        this.bunny = new Bunny(this.ctx, this.canvas, this.config, {x: this.map[0].length, y: this.map.length});
        this.bunny.levelManager = this;
        input.moveEvent = this.move.bind(this);
    }

    
    setPause()
    {
        this.isPause = true;
    }

    setResume()
    {
        this.isPause = false;
    }

    setRestart()
    {
        this.startLevel(this.currentLevel);
    }

    gameOver()
    {
        console.log("game-over");
        
        this.gameOverEvent();
    }

    start()
    {
        this.score = 0;
        this.isPause = false;
    }

    move(dirX, dirY)
    {
        this.bunny.move(dirX,dirY);   
    }

    update(lag)
    {
        this.bunny.update(lag);
    }

    render(msPerUpdate, lag)
    {
        let posBunny = this.bunny.position;
        let targetPos = this.bunny.targetPosition;
        let targetAbsolutePos = this.bunny.targetAbsolutePosition;
        let absolutePosition = this.bunny.absolutePosition;
        for (let i = targetPos.y - this.config.viewSize.y; i <= targetPos.y + this.config.viewSize.y; i++) {
            if (i < 0 || i >= this.map.length) continue;
            for (let j = targetPos.x - this.config.viewSize.x; j <= targetPos.x + this.config.viewSize.x; j++) 
            {
                if (j < 0 || j >= this.map[i].length) continue;

                // J(Проходимся по видимым клеткам) + -(Инвертированная позиция, так-как персонаж двигается в одну сторону, а карта в другую) + 
                // (относительное положение персонажа на экрана)
                let pos = {x: (j + -posBunny.x + absolutePosition.x) * this.config.grid, y: (i + -posBunny.y + absolutePosition.y) * this.config.grid};
                drawImage(this.ctx, this.tiles[this.map[i][j]], pos, {x:this.config.grid+1, y:this.config.grid+1});
            }
        }
        this.bunny.render(msPerUpdate, lag);
    }
}