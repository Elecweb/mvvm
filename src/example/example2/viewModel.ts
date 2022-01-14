import { useEffect, useState } from "react";
import { getAccountBalance } from "../services/getAccountBalance";
import { formatCurrency, getChange, minus } from "../../utils";

type AccountBalance = {
  name: string;
  lastname: string;
  expense: number;
  income: number;
  prevIncome: number;
  prevExpense: number;
  currency: string;
  locale: string;
};

const useViewModel = () => {
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(
    null
  );

  useEffect(() => {
    getAccountBalance().then((data) => {
      setAccountBalance(data);
    });
  }, []);

  if (!accountBalance) {
    return {
      accountBalance: null,
    };
  }

  const expenseCurrentValue = formatCurrency(
    accountBalance.expense,
    accountBalance.locale,
    accountBalance.currency
  );

  const expensePrevValue = formatCurrency(
    accountBalance.prevExpense,
    accountBalance.locale,
    accountBalance.currency
  );

  const expenseChange = getChange(
    accountBalance.expense,
    accountBalance.prevExpense
  );

  const isExpenseIncrease = accountBalance.expense > accountBalance.prevExpense;

  const expenseChangeType = isExpenseIncrease
    ? "increase"
    : ("decrease" as const);

  const expenseChangeStatus = expenseChange > 0 ? "nagative" : "positive";

  const expense = {
    changeType: expenseChangeType,
    currentValue: expenseCurrentValue,
    prevValue: expensePrevValue,
    changeStatus: expenseChangeStatus,
    change: `${expenseChange} %`,
  };

  const incomeCurrentValue = formatCurrency(
    accountBalance.income,
    accountBalance.locale,
    accountBalance.currency
  );

  const incomePrevValue = formatCurrency(
    accountBalance.prevIncome,
    accountBalance.locale,
    accountBalance.currency
  );

  const incomeChange = getChange(
    accountBalance.income,
    accountBalance.prevIncome
  );

  const isIncomeIncrease = accountBalance.income > accountBalance.prevIncome;

  const incomeChangeType = isIncomeIncrease ? "increase" : "decrease";

  const incomeChangeStatus = incomeChange > 0 ? "positive" : "increse";

  const income = {
    changeType: incomeChangeType,
    currentValue: incomeCurrentValue,
    prevValue: incomePrevValue,
    changeStatus: incomeChangeStatus,
    change: `${incomeChange} %`,
  };

  const totalNumber = minus(accountBalance.income, accountBalance.expense);

  const formattedTotal = formatCurrency(
    totalNumber,
    accountBalance.locale,
    accountBalance.currency
  );

  const prevTotal = minus(
    accountBalance.prevIncome,
    accountBalance.prevExpense
  );

  const prevFormattedTotal = formatCurrency(
    prevTotal,
    accountBalance.locale,
    accountBalance.currency
  );

  const totalChange = getChange(totalNumber, prevTotal);

  const isTotalIncrease = totalNumber > prevTotal;

  const totalChangeType = isTotalIncrease ? "increase" : "decrease";

  const totalChangeStatus = isTotalIncrease ? "positive" : "negative";

  const total = {
    changeType: totalChangeType,
    currentValue: formattedTotal,
    prevValue: prevFormattedTotal,
    changeStatus: totalChangeStatus,
    change: `${totalChange} %`,
  };

  return {
    accountBalance: {
      fullName: `${accountBalance.name} ${accountBalance.lastname}`,
      income,
      expense,
      total,
    },
  };
};

export default useViewModel;
