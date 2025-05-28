import config from "./config/config.js";

export default class Animal extends PIXI.Graphics {
  constructor(x, y, app, hero, yard) {
    super();
    this.app = app;
    this.hero = hero;
    this.yard = yard;

    this.x = x;
    this.y = y;
    this.following = false;
    this.patrolTarget = null;

    this.drawDefault();
  }

  drawDefault() {
    this.clear();
    this.beginFill(config.defaultColorAnimal);
    this.drawCircle(0, 0, 10);
    this.endFill();
  }

  drawFollowing() {
    this.clear();
    this.beginFill(config.followingColorAnimal);
    this.drawCircle(0, 0, 10);
    this.endFill();
  }

  updateColor() {
    this.following ? this.drawFollowing() : this.drawDefault();
  }

  patrolBehavior() {
    if (
      !this.patrolTarget ||
      Math.hypot(this.x - this.patrolTarget.x, this.y - this.patrolTarget.y) < config.patrolTargetTolerance
    ) {
      let newTarget;
      let tries = 0;
      do {
        newTarget = {
          x: Math.random() * (this.app.screen.width - 100) + config.minDistanceFromHero,
          y: Math.random() * (this.app.screen.height - 100) + config.minDistanceFromHero,
        };
        tries++;
      } while (this.yard.isInsideOrNearYard(newTarget.x, newTarget.y) && tries < 100);

      this.patrolTarget = newTarget;
    }
  }

  moveTowardPatrolTarget() {
    const dx = this.patrolTarget.x - this.x;
    const dy = this.patrolTarget.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1) {
      this.x += (dx / dist) * 1;
      this.y += (dy / dist) * 1;
    }
  }

  circleAroundHero() {
    const followers = this.app.stage.children.filter((child) => child instanceof Animal && child.following);
    const index = followers.indexOf(this);

    const radius = config.followDistance;
    const angle = ((Math.PI * 2) / 6) * index;

    const targetX = this.hero.x + Math.cos(angle) * radius;
    const targetY = this.hero.y + Math.sin(angle) * radius;

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1) {
      this.x += dx * config.followLerpSpeed;
      this.y += dy * config.followLerpSpeed;
    }
  }

  isInsideYard() {
    return this.yard.isInsideYard(this.x, this.y);
  }

  static getValidSpawnPosition(app, hero, yard) {
    let tries = 0;
    while (tries < 100) {
      const x = Math.random() * (app.screen.width - 100) + config.minDistanceFromHero;
      const y = Math.random() * (app.screen.height - 100) + config.minDistanceFromHero;

      const isFarFromHero = Math.hypot(hero.x - x, hero.y - y) > config.minDistanceFromHero;
      const isOutsideYard = !yard.isInsideOrNearYard(x, y);

      if (isFarFromHero && isOutsideYard) {
        return { x, y };
      }

      tries++;
    }

    return null;
  }
}
