import GameLoop from "./gameLoop.js";
import Input from "./input.js";
import UI_Controller from "./ui_controller.js";
import LevelManager from "./LevelManager/levelManager.js";
import SaveManager from "./saveManager.js";
import Config from "./config.js";
export let GameScreens = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, WIN: 4, GAMEOVER: 5};

export default class Game
{
    constructor()
    {
        this.config = new Config();
        this.ui_controller = new UI_Controller(this.config);
        this.currentScreen;
        this.changeScreen(0);

        this.saveManager = new SaveManager(); 

        new GameLoop(this.update.bind(this), this.render.bind(this));

        this.input = new Input();
        this.input.changeScreenEvent = this.changeScreen.bind(this);
        this.input.startGameEvent = this.startGame.bind(this);

        this.levelManager = new LevelManager(this.input, this.config); // Создавать сразу?
        this.levelManager.gameOverEvent = this.changeScreen.bind(this, GameScreens.GAMEOVER);
        this.levelManager.saveManager = this.saveManager;
    }

    // изменить экран игры на указанный + дополнительный параметр для уточнения поведения
    changeScreen(screen, parameter = 0)
    {
        // Если нажата НЕ кнопка назад
        if (screen != -1) this.ui_controller.turnOnSection(screen);
        switch (screen) {
            case GameScreens.MENU:
                this.currentScreen = GameScreens.MENU;
            break;
            case GameScreens.PLAY:
                if (parameter == 1) this.levelManager.setRestart();
                else if (parameter == 2) this.levelManager.setResume();

                this.currentScreen = GameScreens.PLAY;
            break;
            case GameScreens.PAUSE:
                this.levelManager.setPause();

                this.currentScreen = GameScreens.PAUSE;
            break;
            case GameScreens.GAMEOVER:

                this.currentScreen = GameScreens.GAMEOVER;
            break;
            case -1: // Если нажата кнопка назад
                if (this.currentScreen == GameScreens.PAUSE) this.changeScreen(GameScreens.MENU);
                if (this.currentScreen == GameScreens.GAMEOVER) this.changeScreen(GameScreens.MENU);
            break;
        }
    }

    startGame()
    {
        this.changeScreen(GameScreens.PLAY);
        this.levelManager.start();
    }

    update(lag)
    {   
        if (this.currentScreen != GameScreens.PLAY) return;
        this.levelManager.update(lag);
    }   

    render(msPerUpdate, lag)
    {
        if (this.currentScreen == GameScreens.MENU) return;
        this.config.ctx.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);
        this.config.ctx.imageSmoothingEnabled = false; // Отключить размытие
        this.config.ctx.mozImageSmoothingEnabled = false;
        this.config.ctx.webkitImageSmoothingEnabled = false;
        this.config.ctx.msImageSmoothingEnabled = false;
        this.levelManager.render(msPerUpdate, lag);
    }
}

new Game();

