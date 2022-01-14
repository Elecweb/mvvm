import { useEffect, useState, useMemo } from "react";
import { getAccountBalance } from "../services/getAccountBalance";
import Income from "../../account/example3/Income";
import Expense from "../../account/example3/Expense";
import Balance from "../../account/example3/Balance";
import ChangeAmount from "../../account/example3/ChangeAmount";

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

  const mapChangeAmountToStat = (changeAmount: ChangeAmount) => {
    return {
      changeType: changeAmount.isIncrease() ? "positive" : "negative",
      currentValue: changeAmount.getCurrentAmount().getFormattedAmount(),
      prevValue: changeAmount.getPrevAmount().getFormattedAmount(),
      changeStatus: changeAmount.getChangeStatus(),
      change: changeAmount.getFormattedChange(),
    };
  };

  const expense = mapChangeAmountToStat(expenseIns);

  const income = mapChangeAmountToStat(incomeIns);

  const total = mapChangeAmountToStat(totalIns);

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
