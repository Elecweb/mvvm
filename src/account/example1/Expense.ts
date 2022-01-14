import CurrencyAmount from "../CurrencyAmount";

class Expense {
  private currentAmount: CurrencyAmount;
  private prevAmount: CurrencyAmount;
  private locale: string;
  private currency: string;

  constructor({
    currentAmount,
    prevAmount,
    locale,
    currency,
  }: {
    currentAmount: number;
    prevAmount: number;
    locale: string;
    currency: string;
  }) {
    this.locale = locale;
    this.currency = currency;

    this.currentAmount = new CurrencyAmount({
      amount: currentAmount,
      currency,
      locale,
    });

    this.prevAmount = new CurrencyAmount({
      amount: prevAmount,
      currency,
      locale,
    });
  }

  getCurrentAmount = () => {
    return this.currentAmount;
  };

  getPrevAmount = () => {
    return this.prevAmount;
  };

  isIncrease = () => {
    return this.currentAmount.toNumber() > this.prevAmount.toNumber();
  };

  getChangeStatus = () => {
    return this.isIncrease() ? "negative" : "positive";
  };

  getChange = () => {
    const diff = this.currentAmount.minus(this.prevAmount);
    return diff.divide(this.currentAmount).multiply(
      new CurrencyAmount({
        amount: 100,
        currency: this.currency,
        locale: this.locale,
      })
    );
  };

  getFormattedChange = () => {
    return `${this.getChange().toNumber()} %`;
  };
}

export default Expense;
