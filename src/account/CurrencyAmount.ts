import BigNumber from "bignumber.js";

class CurrencyAmount {
  private amount: BigNumber;
  private currency: string;
  private locale: string;

  constructor({
    amount,
    locale,
    currency,
  }: {
    amount: number;
    locale: string;
    currency: string;
  }) {
    this.amount = new BigNumber(amount);
    this.locale = locale;
    this.currency = currency;
  }

  toNumber = () => {
    return this.amount.toNumber();
  };

  getFormattedAmount = () => {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
    }).format(this.amount.toNumber());
  };

  toCurrencyAmount = (amount: BigNumber) => {
    return new CurrencyAmount({
      amount: amount.toNumber(),
      currency: this.currency,
      locale: this.locale,
    });
  };

  multiply = (currencyAmount: CurrencyAmount) => {
    return this.toCurrencyAmount(this.amount.times(currencyAmount.toNumber()));
  };

  plus = (currencyAmount: CurrencyAmount) => {
    return this.toCurrencyAmount(this.amount.plus(currencyAmount.toNumber()));
  };

  divide = (currencyAmount: CurrencyAmount) => {
    return this.toCurrencyAmount(
      this.amount.dividedBy(currencyAmount.toNumber())
    );
  };

  minus = (currencyAmount: CurrencyAmount) => {
    return this.toCurrencyAmount(this.amount.minus(currencyAmount.toNumber()));
  };
}

export default CurrencyAmount;
