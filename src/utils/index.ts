import BigNumber from "bignumber.js";

export const formatCurrency = (
  amount: number,
  locale: string,
  currency: string
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const getChange = (current: number, prev: number) => {
  const diff = minus(current, prev);
  return divide(diff, current) * 100;
};

export const multiply = (number: number, time: number) => {
  return new BigNumber(number).times(time).toNumber();
};

export const plus = (number: number, time: number) => {
  return new BigNumber(number).plus(time).toNumber();
};

export const divide = (number: number, time: number) => {
  return new BigNumber(number).dividedBy(time).toNumber();
};

export const minus = (number: number, time: number) => {
  return new BigNumber(number).minus(time).toNumber();
};
