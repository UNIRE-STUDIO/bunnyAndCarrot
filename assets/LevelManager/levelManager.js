import { randomRange, getTimeFormat, drawRect } from "../general.js";
import SaveManager from "../saveManager.js";
import Bunny from "./bunny.js";
import MapManager from "./mapManager.js";

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
        
        this.bunny = new Bunny(this.ctx, this.canvas);
        this.mapManager = new MapManager();

        input.moveXEvent = this.bunny.moveX.bind(this);
        input.moveYEvent = this.bunny.moveY.bind(this);
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

    update(lag)
    {
        
    }

    render()
    {
        this.mapManager.render(this.ctx, this.config);
        this.bunny.render(this.ctx, this.config);
    }
}