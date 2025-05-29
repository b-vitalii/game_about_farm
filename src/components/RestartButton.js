import { restartBtnTextConfig } from "./styles/Styles.js";
import textConfig from "./config/textConfig.js";

export default class RestartButton extends PIXI.Text {
    constructor(onClick, app) {
        super(textConfig.restartBtnTextConfig, restartBtnTextConfig);
        this.app = app;
        this.onClick = onClick;

        this.anchor.set(0.5);
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2 + 70;
        this.interactive = true;
        this.buttonMode = true;
        this.visible = false;

        this.addListners();
    }

    addListners() {
        this.on("pointerdown", this.onClick);
    }

    resize() {
        this.x = this.app.screen.width / 2;
        this.y = this.app.screen.height / 2 + 70;
    }
}