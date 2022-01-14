import { useEffect, useState } from "react";
import Stat from "../../baseUI/Stat";
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

const Account = () => {
  const [accountBalance, setAccountBalance] = useState<AccountBalance | null>(
    null
  );

  useEffect(() => {
    getAccountBalance().then((data) => {
      setAccountBalance(data);
    });
  }, []);

  if (!accountBalance) {
    return null;
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

  const total = minus(accountBalance.income, accountBalance.expense);

  const formattedTotal = formatCurrency(
    total,
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

  const totalChange = getChange(total, prevTotal);

  return (
    <div className="px-11 pt-20 min-h-screen bg-gray-100">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {accountBalance.name} {accountBalance.lastname}
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <Stat
          title="Expense"
          changeType={
            accountBalance.expense > accountBalance.prevExpense
              ? "increase"
              : "decrease"
          }
          currentValue={expenseCurrentValue}
          prevValue={expensePrevValue}
          change={`${expenseChange} %`}
          changeStatus={expenseChange > 0 ? "nagative" : "positive"}
        />
        <Stat
          title="Income"
          changeType={
            accountBalance.income > accountBalance.prevIncome
              ? "increase"
              : "decrease"
          }
          currentValue={incomeCurrentValue}
          prevValue={incomePrevValue}
          change={`${incomeChange} %`}
          changeStatus={incomeChange > 0 ? "positive" : "nagative"}
        />
        <Stat
          title="Total"
          changeType={
            accountBalance.income > accountBalance.prevIncome
              ? "increase"
              : "decrease"
          }
          currentValue={formattedTotal}
          prevValue={prevFormattedTotal}
          change={`${totalChange} %`}
          changeStatus={totalChange > 0 ? "positive" : "nagative"}
        />
      </dl>
    </div>
  );
};

export default Account;
