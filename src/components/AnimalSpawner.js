import Animal from "./Animal.js";
import config from "./config/config.js";

export default class AnimalSpawner {
  constructor(app, hero, yard, createAnimalCallback) {
    this.app = app;
    this.hero = hero;
    this.yard = yard;
    this.createAnimal = createAnimalCallback;

    this.spawning = false;
    this.spawnTimeout = null;
  }

  start() {
    this.spawning = true;
    this.scheduleNextSpawn();
  }

  stop() {
    this.spawning = false;
    if (this.spawnTimeout) {
      clearTimeout(this.spawnTimeout);
      this.spawnTimeout = null;
    }
  }

  scheduleNextSpawn() {
    if (!this.spawning) return;

    const spawnDelay = Math.random() * (config.spawnDelayMax - config.spawnDelayMin) + config.spawnDelayMin;

    this.spawnTimeout = setTimeout(() => {
      this.spawnAnimal();
      this.scheduleNextSpawn();
    }, spawnDelay);
  }

  spawnAnimal() {
    const pos = Animal.getValidSpawnPosition(this.app, this.hero, this.yard);
    if (pos) this.createAnimal(pos.x, pos.y);
  }
}
