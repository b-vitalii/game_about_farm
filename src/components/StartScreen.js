import { loadingTextConfig, rulesTextStyleConfig } from "./styles/Styles.js";
import config from "./config/config.js";
import textConfig from "./config/textConfig.js";
import ProgressBar from "./ProgressBar.js";

export default class StartScreen {
  constructor(app) {
    this.app = app;

    this.createChildren();
  }

  createChildren() {
    const rulesTextStyle = new PIXI.TextStyle(rulesTextStyleConfig);

    this.startScreen = new PIXI.Container();
    this.app.stage.addChild(this.startScreen);

    this.startBgCont = new PIXI.Container();
    this.startScreen.addChild(this.startBgCont);

    const startBg = new PIXI.Graphics();
    startBg.beginFill(config.startBgColor);
    startBg.drawRect(0, 0, 100, 200);
    startBg.endFill();
    this.startBgCont.addChild(startBg);

    this.rulesCont = new PIXI.Container();
    this.startScreen.addChild(this.rulesCont);

    this.heroRulesCont = new PIXI.Container();
    this.rulesCont.addChild(this.heroRulesCont);
    const heroRules = new PIXI.Graphics();
    heroRules.beginFill(config.heroColor);
    heroRules.drawCircle(0, 0, 20);
    heroRules.endFill();
    heroRules.x = 0;
    heroRules.y = 50;
    this.heroRulesCont.addChild(heroRules);

    const textHeroRules = new PIXI.Text(textConfig.txtHeroRules, rulesTextStyle);
    textHeroRules.anchor.set(0, 0.5);
    textHeroRules.x = heroRules.width / 2 + 10;
    textHeroRules.y = heroRules.y;
    this.heroRulesCont.addChild(textHeroRules);

    this.animalRulesCont = new PIXI.Container();
    this.rulesCont.addChild(this.animalRulesCont);
    const animalRules = new PIXI.Graphics();
    animalRules.beginFill(config.defaultColorAnimal);
    animalRules.drawCircle(0, 0, 10);
    animalRules.endFill();
    animalRules.x = 0;
    animalRules.y = 100;
    this.animalRulesCont.addChild(animalRules);

    const textAnimalRules = new PIXI.Text(textConfig.animalsCollectTXT, rulesTextStyle);
    textAnimalRules.anchor.set(0, 0.5);
    textAnimalRules.x = animalRules.width / 2 + 10;
    textAnimalRules.y = animalRules.y;
    this.animalRulesCont.addChild(textAnimalRules);

    this.yardRulesCont = new PIXI.Container();
    this.rulesCont.addChild(this.yardRulesCont);
    const yardRules = new PIXI.Graphics();
    yardRules.beginFill(config.yardColor);
    yardRules.drawRect(-75, 0, 150, 100);
    yardRules.endFill();
    yardRules.x = 0;
    yardRules.y = 130;
    this.yardRulesCont.addChild(yardRules);

    const textYardRules = new PIXI.Text(textConfig.yardTXT, rulesTextStyle);
    textYardRules.anchor.set(0, 0.5);
    textYardRules.x = yardRules.width / 2 + 10;
    textYardRules.y = yardRules.height / 2 + yardRules.y;
    this.yardRulesCont.addChild(textYardRules);

    this.winRulesCont = new PIXI.Container();
    this.rulesCont.addChild(this.winRulesCont);
    const textWinRules = new PIXI.Text(textConfig.textWinRulesTXT, rulesTextStyle);
    textWinRules.anchor.set(0.5);
    textWinRules.x = textWinRules.width / 2 - 70;
    textWinRules.y = 0;
    this.winRulesCont.addChild(textWinRules);

    this.loadingText = new PIXI.Text(textConfig.loadingTXT, loadingTextConfig);
    this.loadingText.anchor.set(0.5);
    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2 - 40;
    this.startScreen.addChild(this.loadingText);

    this.progressBar = new ProgressBar(this.app);
    this.startScreen.addChild(this.progressBar.getView());
  }

  hide() {
    this.startScreen.visible = false;
  }

  resize() {
    this.startBgCont.width = this.app.screen.width;
    this.startBgCont.height = this.app.screen.height;

    this.progressBar.resize()

    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2 - 140;

    this.rulesCont.x = this.app.screen.width / 2 - 150;
    this.rulesCont.y = this.app.screen.height / 2;
  }
}
