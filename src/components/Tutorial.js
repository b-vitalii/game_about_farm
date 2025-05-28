import { tutorialTextConfig } from "./styles/Styles.js";
import textConfig from "./config/textConfig.js";

export default class Tutorial {
  constructor(app, hero, yard) {
    this.app = app;
    this.hero = hero;
    this.yard = yard;

    this.createChildren();
    this.animateArrow();
  }

  createChildren() {
    const style = new PIXI.TextStyle(tutorialTextConfig);

    this.startPrompt = new PIXI.Container();
    this.app.stage.addChild(this.startPrompt);

    this.startPrompt.x = this.hero.hero.x;
    this.startPrompt.y = this.hero.hero.y - 60;

    this.arrow = new PIXI.Graphics();
    this.arrow.beginFill(0x000000);
    this.arrow.drawPolygon([-10, 0, 10, 0, 0, 20]);
    this.arrow.endFill();
    this.arrow.x = 0;
    this.arrow.y = 0;
    this.startPrompt.addChild(this.arrow);

    const text = new PIXI.Text(textConfig.clickTutorText, style);
    text.anchor.set(0.5, 0);
    text.y = -25;
    this.startPrompt.addChild(text);

    this.textYard = new PIXI.Text(textConfig.yardTutorText, style);
    this.textYard.anchor.set(0.5);
    this.textYard.x = this.yard.yard.width / 2;
    this.textYard.y = this.yard.yard.height / 2;
    this.yard.yard.addChild(this.textYard);
  }

  animateArrow() {
    let arrowStartY = this.arrow.y;
    createjs.Tween.get(this.arrow, { loop: true })
      .to({ y: arrowStartY + 10 }, 600, createjs.Ease.sineInOut)
      .to({ y: arrowStartY }, 600, createjs.Ease.sineInOut);
  }

  hide() {
    this.startPrompt.visible = false;
    this.textYard.visible = false;
  }

  show() {
    this.startPrompt.visible = true;
    this.textYard.visible = true;
  }

  resize() {
    console.log(`if need tutor resize`);
  }
}
