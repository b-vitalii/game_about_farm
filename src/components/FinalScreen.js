import { finalScoreTimerTextConfig, restartBtnTextConfig, winTextConfig } from "./styles/Styles.js";
import config from "./config/config.js";
import textConfig from "./config/textConfig.js";

export default class FinalScreen {
  constructor(app) {
    this.app = app;

    this.createChildren();
  }

  createChildren() {
    this.winOverlayCont = new PIXI.Container();
    this.app.stage.addChild(this.winOverlayCont);

    this.winOverlay = new PIXI.Graphics();
    this.winOverlay.beginFill(config.winOverlayColor, 0.7);
    this.winOverlay.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    this.winOverlay.endFill();
    this.winOverlay.visible = false;

    this.winText = new PIXI.Text(textConfig.winTextConfig, winTextConfig);

    this.winText.anchor.set(0.5);
    this.winText.x = this.app.screen.width / 2;
    this.winText.y = this.app.screen.height / 2;
    this.winText.visible = false;

    this.finalCont = new PIXI.Container();
    this.finalCont.visible = false;

    this.restartBtn = new PIXI.Text(textConfig.restartBtnTextConfig, restartBtnTextConfig);
    this.restartBtn.anchor.set(0.5);
    this.restartBtn.x = this.app.screen.width / 2;
    this.restartBtn.y = this.app.screen.height / 2 + 150;
    this.restartBtn.interactive = true;
    this.restartBtn.buttonMode = true;
    this.restartBtn.visible = false;

    this.winOverlayCont.addChild(this.winOverlay);
    this.app.stage.addChild(this.finalCont);
    this.app.stage.addChild(this.winText);
    this.app.stage.addChild(this.restartBtn);
  }

  restartGame() {
    this.winOverlay.visible = false;
    this.winText.visible = false;
    this.restartBtn.visible = false;
    this.finalCont.visible = false;
    this.finalCont.removeChildren();
  }

  showFinalScreen() {
    this.winOverlay.visible = true;
    this.winText.visible = true;
    this.restartBtn.visible = true;
    this.finalCont.visible = true;
  }

  showFinalScore(score) {
    const scoreText = new PIXI.Text(`Score: ${score}`, finalScoreTimerTextConfig);
    scoreText.anchor.set(0.5);
    scoreText.x = 0;
    scoreText.y = 0;
    this.finalCont.addChild(scoreText);
  }

  showFinalTime(gameTimeSeconds) {
    const minutes = Math.floor(gameTimeSeconds / 60);
    const seconds = Math.floor(gameTimeSeconds % 60);

    const timerText = new PIXI.Text(
      `Time: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      finalScoreTimerTextConfig
    );
    timerText.anchor.set(0.5);
    timerText.x = 0;
    timerText.y = 50;
    this.finalCont.addChild(timerText);
  }

  resize() {
    this.winOverlayCont.width = this.app.screen.width;
    this.winOverlayCont.height = this.app.screen.height;

    this.winText.x = this.app.screen.width / 2;
    this.winText.y = this.app.screen.height / 2 - 100;

    this.restartBtn.x = this.app.screen.width / 2;
    this.restartBtn.y = this.app.screen.height / 2 + 70;

    this.finalCont.x = this.app.screen.width / 2;
    this.finalCont.y = this.app.screen.height / 2 - 40;
  }
}
