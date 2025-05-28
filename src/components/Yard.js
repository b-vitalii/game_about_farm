import config from "./config/config.js";

export default class Yard {
  constructor(app) {
    this.app = app;

    this.createChildren();
  }

  createChildren() {
    this.yard = new PIXI.Graphics();
    this.yard.beginFill(config.yardColor);
    this.yard.drawRect(0, 0, 150, 100);
    this.yard.endFill();
    // this.yard.x = 600;
    // this.yard.y = 50;

    this.app.stage.addChild(this.yard);
  }

  getBounds() {
    return this.yard.getBounds();
  }

  isInsideYard(x, y) {
    const yardBounds = this.getBounds();
    return (
      x > yardBounds.x &&
      x < yardBounds.x + yardBounds.width &&
      y > yardBounds.y &&
      y < yardBounds.y + yardBounds.height
    );
  }

  isInsideOrNearYard(x, y) {
    const margin = 50;
    const yardBounds = this.getBounds();
    return (
      x > yardBounds.x - margin &&
      x < yardBounds.x + yardBounds.width + margin &&
      y > yardBounds.y - margin &&
      y < yardBounds.y + yardBounds.height + margin
    );
  }

  resize() {
    this.yard.x = this.app.screen.width - 160;
    this.yard.y = 50;
  }
}
