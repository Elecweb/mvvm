import Stat from "../../baseUI/Stat";
import useViewModel from "./viewModel";

const Account = () => {
  const { accountBalance } = useViewModel();

  if (!accountBalance) {
    return null;
  }

  const { expense, income, total, fullName } = accountBalance;

  return (
    <div className="px-11 pt-20 min-h-screen bg-gray-100">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {fullName}
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <Stat
          title="Expense"
          changeType={expense.changeType}
          currentValue={expense.currentValue}
          prevValue={expense.prevValue}
          change={expense.change}
          changeStatus={expense.changeStatus}
        />
        <Stat
          title="Income"
          changeType={income.changeType}
          currentValue={income.currentValue}
          prevValue={income.prevValue}
          change={income.change}
          changeStatus={income.changeStatus}
        />
        <Stat
          title="Total"
          changeType={total.changeType}
          currentValue={total.currentValue}
          prevValue={total.prevValue}
          change={total.change}
          changeStatus={total.changeStatus}
        />
      </dl>
    </div>
  );
};

export default Account;
