import config from "./config/config.js";

export default class ProgressBar {
    constructor(app) {
        this.app = app;
        this.container = new PIXI.Container();
        this.border = new PIXI.Graphics();
        this.fill = new PIXI.Graphics();

        this.container.addChild(this.border);
        this.container.addChild(this.fill);

        this.loadProgress = 0;
        this.loadProgressEnd = 100;
        this.loadingDone = false;

        this.draw();
    }

    draw() {
        this.border.clear();
        this.border.lineStyle(4, config.progressBarBorderColor);
        this.border.drawRect(0, 0, 400, 30);

        this.fill.clear();
        this.fill.beginFill(config.progressBarFillColor);
        this.fill.drawRect(0, 0, 4 * this.loadProgress, 30);
        this.fill.endFill();
    }

    setProgress(value) {
        this.loadProgress = Math.min(value, this.loadProgressEnd);
        this.update();
    }

    update() {
        this.fill.clear();
        this.fill.beginFill(config.progressBarFillColor);
        this.fill.drawRect(0, 0, 4 * this.loadProgress, 30);
        this.fill.endFill();
    }

    increaseProgress(amount) {
        this.setProgress(this.loadProgress + amount);
    }

    resize() {
        this.container.x = (this.app.screen.width - 400) / 2;
        this.container.y = this.app.screen.height / 2 - 100;
    }

    getView() {
        return this.container;
    }

    progressAfterDone() {
        this.loadProgress = this.loadProgressEnd;
        this.loadingProgressDone();
    }

    loadingProgressDone() {
        this.loadingDone = true;
    }

    loadingProgressNotDone() {
        this.loadingDone = false;
    }

    getloadingProgress() {
        return this.loadingDone;
    }

    isComplete() {
        return this.loadProgress >= this.loadProgressEnd;
    }
}
