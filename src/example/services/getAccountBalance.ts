export const getAccountBalance = () => {
  return Promise.resolve({
    name: "John",
    lastname: "Doe",
    expense: 10000,
    income: 20000,
    prevExpense: 8000,
    prevIncome: 15000,
    locale: "en-US",
    currency: "USD",
  });
};
