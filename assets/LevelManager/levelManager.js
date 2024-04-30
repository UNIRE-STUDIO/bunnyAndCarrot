import { randomRange, getTimeFormat, drawRect } from "../general.js";
import SaveManager from "../saveManager.js";
import Bunny from "./bunny.js";

export default class LevelManager
{
    constructor(input, config)
    {
        this.score = 0;

        this.isPause = false;

        // Присваивает класс Game
        this.gameOverEvent;
        this.saveManager;

        // куда-то
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timeUpdate = 0;
        
        // config
        this.config = config;

        input.moveXEvent = this.moveX.bind(this);
        input.moveYEvent = this.moveY.bind(this);
        
        this.bunny = new Bunny();
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

    moveX(dir)
    {
        this.bunny.position.x += dir;
    }
    moveY(dir)
    {
        this.bunny.position.y += dir;
    }

    start()
    {
        this.score = 0;
        this.isPause = false;
    }

    update(lag)
    {
        
    }

    render()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);   // Убрать
        this.bunny.render(this.ctx, this.config);
    }
}