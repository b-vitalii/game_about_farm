import { scoreTimerTextConfig } from "./styles/Styles.js";

export default class UI {
  constructor(app) {
    this.app = app;
    this.gameTimeSeconds = 0;
    this.timerRunning = false;
    this.score = 0;

    this.createChildren();
  }

  createChildren() {
    const style = scoreTimerTextConfig;

    this.scoreText = new PIXI.Text("Score: 0", style);
    this.scoreText.position.set(10, 10);

    this.timerText = new PIXI.Text("Time: 00:00", style);
    this.timerText.position.set(10, 40);

    this.app.stage.addChild(this.scoreText);
    this.app.stage.addChild(this.timerText);
  }

  restartGame() {
    this.score = 0;
    this.scoreText.text = "Score: 0";
    this.timerText.text = "Time: 00:00";
  }

  increaseScore() {
    this.score++;
    this.scoreText.text = "Score: " + this.score;
  }

  updateTimer(minutes, seconds) {
    this.timerText.text = `Time: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  resize() {
    this.scoreText.position.set(10, 10);
    this.timerText.position.set(10, 40);
  }
}
