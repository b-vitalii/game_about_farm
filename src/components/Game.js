import StartScreen from "./StartScreen.js";
import UI from "./UI.js";
import Yard from "./Yard.js";
import Hero from "./Hero.js";
import Tutorial from "./Tutorial.js";
import FinalScreen from "./FinalScreen.js";
import Animal from "./Animal.js";
import EffectsManager from "./EffectsManager.js";
import AnimalSpawner from "./AnimalSpawner.js";
import config from "./config/config.js";

export default class Game {
  constructor() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x2ecc71,
    });
    document.body.appendChild(this.app.view);

    this.gameWon = false;
    this.gameStarted = false;
    this.timerRunning = false;
    this.initialAnimalCount =
      Math.floor(Math.random() * (config.initialAnimalMax - config.initialAnimalMin + 1)) + config.initialAnimalMin;
    this.gameTimeSeconds = 0;
    this.animals = [];

    this.yard = new Yard(this.app);
    this.hero = new Hero(this.app);
    this.ui = new UI(this.app);
    this.tutorial = new Tutorial(this.app, this.hero, this.yard);
    this.startScreen = new StartScreen(this.app);
    this.finalScreen = new FinalScreen(this.app, () => this.restartGame());
    this.effectsManager = new EffectsManager(this.app);
    this.animalSpawner = new AnimalSpawner(this.app, this.hero.hero, this.yard, (x, y) => this.createAnimal(x, y));

    this.addListeners();
    this.onResize();

    this.app.ticker.add(() => this.update());
  }

  addListeners() {
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    console.log("Window resized:", window.innerWidth, window.innerHeight);
    this.startScreen.resize();
    this.ui.resize();
    this.yard.resize();
    this.hero.resize();
    this.tutorial.resize();
    this.finalScreen.resize();
  }

  createAnimal(x, y) {
    const animal = new Animal(x, y, this.app, this.hero.hero, this.yard);
    this.animals.push(animal);
    this.app.stage.addChild(animal);
  }

  onPointerDown(event) {
    if (this.gameWon) return;
    this.hero.setTarget(event.data.global);
    if (!this.gameStarted) {
      this.startGame();
    }
  }

  startGame() {
    this.gameStarted = true;
    this.timerRunning = true;
    this.animalSpawner.start();
  }

  countFollowers() {
    return this.animals.filter((a) => a.following).length;
  }

  restartGame() {
    this.finalScreen.restartGame();
    this.ui.restartGame();

    this.gameWon = false;
    this.gameStarted = false;
    this.timerRunning = false;
    this.gameTimeSeconds = 0;

    this.hero.restartGame();
    this.clearAnimalArr();
    this.spawnAnimalAfterLoading();
  }

  spawnAnimalAfterLoading() {
    for (let i = 0; i < this.initialAnimalCount; i++) {
      const pos = Animal.getValidSpawnPosition(this.app, this.hero.hero, this.yard);
      if (pos) this.createAnimal(pos.x, pos.y);
    }
  }

  checkWinGame() {
    if (this.ui.score >= config.winScore && !this.gameWon) {
      this.clearAnimalArr();
      this.animalSpawner.stop();

      this.gameWon = true;
      this.timerRunning = false;

      this.finalScreen.showFinalScreen();
      this.finalScreen.showFinalScore(this.ui.score);
      this.finalScreen.showFinalTime(this.gameTimeSeconds);
    }
  }

  clearAnimalArr() {
    this.animals.forEach((a) => this.app.stage.removeChild(a));
    this.animals.length = 0;
  }

  updateTimer() {
    if (this.timerRunning) {
      this.gameTimeSeconds += this.app.ticker.elapsedMS / 1000;
      const minutes = Math.floor(this.gameTimeSeconds / 60);
      const seconds = Math.floor(this.gameTimeSeconds % 60);
      this.ui.updateTimer(minutes, seconds);
    }
  }

  checkHeroCloseToStartFollowing(animal) {
    const heroDist = Math.hypot(animal.x - this.hero.hero.x, animal.y - this.hero.hero.y);
    if (heroDist < config.followDistance && this.countFollowers() < config.maxFollowers) {
      animal.following = true;
      animal.patrolTarget = null;
      if (!this.gameStarted) this.gameStarted = true;
    }
  }

  handleAnimalDelivered(animal) {
    animal.following = false;
    this.effectsManager.createCollectEffect(animal.x, animal.y);
    this.app.stage.removeChild(animal);
    const index = this.animals.indexOf(animal);
    if (index !== -1) this.animals.splice(index, 1);

    this.ui.increaseScore();
    this.checkWinGame();
  }

  updateAnimals() {
    this.animals.forEach((animal) => {
      animal.updateColor();
      if (!animal.following) {
        this.handlePatrolAnimal(animal);
      }
      if (animal.following) {
        this.handleFollowingAnimal(animal);
      }
    });
  }

  handlePatrolAnimal(animal) {
    animal.patrolBehavior();
    animal.moveTowardPatrolTarget();
    this.checkHeroCloseToStartFollowing(animal);
  }

  handleFollowingAnimal(animal) {
    animal.circleAroundHero();
    if (animal.isInsideYard()) this.handleAnimalDelivered(animal);
  }

  showTutorial() {
    if (this.startScreen.getloadingProgress() && !this.gameStarted) {
      this.tutorial.show();
    } else {
      this.tutorial.hide();
    }
  }

  loadProgressBarOnStartScr() {
    if (!this.startScreen.getloadingProgress()) {
      this.startScreen.loadProgress += config.loadProgressSpeed;
      if (this.startScreen.checkLoadProgressEnd()) {
        this.startScreen.progressAfterDone();

        this.app.stage.interactive = true;
        this.app.stage.on("pointerdown", this.onPointerDown.bind(this));

        this.spawnAnimalAfterLoading();
      }

      this.startScreen.updateWidthProgressBar();

      return;
    }
  }

  update() {
    this.loadProgressBarOnStartScr();
    this.showTutorial();
    if (this.gameWon) return;
    this.hero.moveToTarget();
    if (!this.gameStarted) return;
    this.updateTimer();
    this.updateAnimals();
  }
}
