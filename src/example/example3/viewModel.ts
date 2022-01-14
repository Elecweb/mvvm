import { useEffect, useState, useMemo } from "react";
import { getAccountBalance } from "../services/getAccountBalance";
import Income from "../../account/example2/Income";
import Expense from "../../account/example2/Expense";
import Balance from "../../account/Balance";

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

  const incomeIns = useMemo(() => {
    if (accountBalance) {
      return new Income({
        currentAmount: accountBalance.income,
        currency: accountBalance.currency,
        locale: accountBalance.locale,
        prevAmount: accountBalance.prevIncome,
      });
    } else {
      return null;
    }
  }, [accountBalance]);

  const expenseIns = useMemo(() => {
    if (accountBalance) {
      return new Expense({
        currentAmount: accountBalance.expense,
        currency: accountBalance.currency,
        locale: accountBalance.locale,
        prevAmount: accountBalance.prevExpense,
      });
    } else {
      return null;
    }
  }, [accountBalance]);

  const totalIns = useMemo(() => {
    if (expenseIns && incomeIns && accountBalance) {
      return new Balance({
        expense: expenseIns,
        income: incomeIns,
        locale: accountBalance.locale,
        currency: accountBalance.currency,
      });
    }
  }, [expenseIns, incomeIns, accountBalance]);

  useEffect(() => {
    getAccountBalance().then((data) => {
      setAccountBalance(data);
    });
  }, []);

  if (!accountBalance || !incomeIns || !expenseIns || !totalIns) {
    return {
      accountBalance: null,
    };
  }

  const expense = {
    changeType: expenseIns.isIncrease() ? "positive" : "negative",
    currentValue: expenseIns.getCurrentAmount().getFormattedAmount(),
    prevValue: expenseIns.getPrevAmount().getFormattedAmount(),
    changeStatus: expenseIns.getChangeStatus(),
    change: expenseIns.getFormattedChange(),
  };

  const income = {
    changeType: incomeIns.isIncrease() ? "positive" : "negative",
    currentValue: incomeIns.getCurrentAmount().getFormattedAmount(),
    prevValue: incomeIns.getPrevAmount().getFormattedAmount(),
    changeStatus: incomeIns.getChangeStatus(),
    change: incomeIns.getFormattedChange(),
  };

  const total = {
    changeType: incomeIns.isIncrease() ? "positive" : "negative",
    currentValue: totalIns.getCurrentAmount().getFormattedAmount(),
    prevValue: totalIns.getPrevAmount().getFormattedAmount(),
    changeStatus: totalIns.getChangeStatus(),
    change: totalIns.getFormattedChange(),
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
