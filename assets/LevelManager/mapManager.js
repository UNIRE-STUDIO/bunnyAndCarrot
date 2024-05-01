import { drawImage } from "../general.js";

export default class MapManager
{
    constructor()
    {
        this.map = [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
        this.tile1 = new Image();
        this.tile1.src = "/assets/Grass.png";
    };

    update()
    {

    }

    render(ctx, config)
    {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) 
            {
                let pos = {x: j * config.grid, y: i * config.grid};
                drawImage(ctx, this.tile1, pos, {x:config.grid, y:config.grid});
            }
        }
        
        
    }
}