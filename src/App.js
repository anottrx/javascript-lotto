const Cost = require('./Cost');
const Lotto = require('./Lotto');
const Bonus = require('./Bonus');
const { INPUT_MESSAGE, ERROR_MESSAGE, LOTTO, COST } = require('./constant/constant');
const { getInput } = require('./utils');
const BuyLotto = require('./BuyLotto');

class App {
  constructor() {
    this.cost = 0;
    this.lotto = [];
    this.bonus = 0;
    this.buyLotto = [];
  }

  getCost() {
    getInput(INPUT_MESSAGE.COST, (input) => {
      this.cost = new Cost(+input);
    });
  }

  buyLottoCountTimes() {
    this.buyLotto = new BuyLotto(this.cost.getValue() / COST.DIVIDE);
    this.buyLotto.printBuyCount();
  }

  getLottoNumber() {
    getInput(INPUT_MESSAGE.LOTTO_NUMBERS, (input) => {
      this.lotto = new Lotto(input.split(',').map((number) => +number));
    });
  }

  getBonusNumber() {
    getInput(INPUT_MESSAGE.BONUS_NUMBER, (input) => {
      this.bonus = new Bonus(+input);
    });
  }

  lottoBonusCheck() {
    if (this.lotto.getValue().filter((number) => number === this.bonus.getValue()).length === 1) {
      throw new Error(ERROR_MESSAGE.BONUS.NUMBER_DUPLICATED);
    }
  }

  getInputAndValidate() {
    this.getLottoNumber();
    this.getBonusNumber();
    this.lottoBonusCheck();
  }

  play() {
    this.getCost();
    this.buyLottoCountTimes();
    this.getInputAndValidate();
  }
}
module.exports = App;
