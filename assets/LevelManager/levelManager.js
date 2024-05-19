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
        
    }

    render(msPerUpdate, lag)
    {
        let targetPos = this.bunny.position;
        let targetAbsolutePos = this.bunny.absolutePosition;
        for (let i = 0; i <= this.config.viewSize.y; i++) {
            let tileY = targetPos.y - targetAbsolutePos.y + i;
            if (tileY < 0 || tileY >= this.map.length) continue;
            for (let j = 0; j <= this.config.viewSize.x; j++) 
            {
                let tileX = targetPos.x - targetAbsolutePos.x + j;
                if (tileX < 0 || tileX >= this.map[i].length) continue;
                let pos = {x: j * this.config.grid, y: i * this.config.grid};
                drawImage(this.ctx, this.tiles[this.map[tileY][tileX]], pos, {x:this.config.grid, y:this.config.grid});
            }
        }
        this.bunny.render(msPerUpdate, lag);
    }
}