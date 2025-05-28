import config from "./config/config.js";

export default class Hero {
  constructor(app) {
    this.application = app;
    this.targetPos = { x: 400, y: 300 };

    this.createChildren();
  }

  createChildren() {
    this.hero = new PIXI.Graphics();
    this.hero.beginFill(config.heroColor);
    this.hero.drawCircle(0, 0, 20);
    this.hero.endFill();
    this.hero.x = 400;
    this.hero.y = 300;

    this.application.stage.addChild(this.hero);
  }

  setTarget(pos) {
    this.targetPos = pos;
  }

  moveToTarget() {
    const dx = this.targetPos.x - this.hero.x;
    const dy = this.targetPos.y - this.hero.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1) {
      this.hero.x += dx * config.heroSpeed;
      this.hero.y += dy * config.heroSpeed;
    }
  }

  restartGame() {
    this.hero.x = 400;
    this.hero.y = 300;
    this.targetPos = { x: 400, y: 300 };
  }

  resize() {}
}
