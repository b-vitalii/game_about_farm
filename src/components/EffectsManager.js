import { plusOneText } from "./styles/Styles.js";

export default class EffectsManager {
  constructor(app) {
    this.app = app;
  }

  createCollectEffect(x, y) {
    const effect = new PIXI.Graphics();
    effect.beginFill(0xffffff);
    effect.drawCircle(0, 0, 10);
    effect.endFill();
    effect.x = x;
    effect.y = y;
    this.app.stage.addChild(effect);

    let scale = 1;
    let alpha = 1;

    const animate = () => {
      scale += 0.5;
      alpha -= 0.1;
      effect.scale.set(scale);
      effect.alpha = alpha;

      if (alpha <= 0) {
        this.app.stage.removeChild(effect);
        this.app.ticker.remove(animate);
      }
    };

    this.app.ticker.add(animate);
    this.createTextYardUpAnim(x, y);
    this.createParticleOnYard(x, y);
  }

  createParticleOnYard(x, y) {
    for (let i = 0; i < 8; i++) {
      const particle = new PIXI.Graphics();
      particle.beginFill(0xffff00);
      particle.drawCircle(0, 0, 3);
      particle.endFill();
      particle.x = x;
      particle.y = y;
      this.app.stage.addChild(particle);

      this.particleAnim(particle, x, y);
    }
  }

  createTextYardUpAnim(x, y) {
    const text = new PIXI.Text("+1", plusOneText);
    text.anchor.set(0.5);
    text.x = x;
    text.y = y;
    this.app.stage.addChild(text);

    createjs.Tween.get(text)
      .to({ y: y - 30, alpha: 0 }, 800)
      .call(() => this.app.stage.removeChild(text));
  }

  particleAnim(particle, x, y) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 20;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;

    createjs.Tween.get(particle)
      .to({ x: targetX, y: targetY, alpha: 0 }, 600)
      .call(() => this.app.stage.removeChild(particle));
  }
}
