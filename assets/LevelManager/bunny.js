import { drawImage } from "../general.js";

export default class Bunny
{
    constructor()
    {
        this.position = {
            x: 0,
            y: 0
        }
        this.image = new Image();
        this.image.src = "/assets/Bunny.png";
    };

    update()
    {

    }

    render(ctx, config)
    {
        let pos = {x: this.position.x * config.grid, y: this.position.y * config.grid};
        drawImage(ctx, this.image, pos, {x:config.grid, y:config.grid});
    }
}