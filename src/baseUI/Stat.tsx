import { cx } from "@emotion/css";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

type StatProps = {
  title: string;
  changeType: string;
  changeStatus: string;
  currentValue: string;
  prevValue: string;
  change: string;
};

const Stat = ({
  title,
  changeType,
  currentValue,
  prevValue,
  change,
  changeStatus,
}: StatProps) => {
  const statusColor =
    changeStatus === "positive" ? "text-green-500" : "text-red-500";

  return (
    <div className="px-4 py-5 sm:p-6 ">
      <dt className="text-base font-normal text-gray-900">{title}</dt>
      <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
          {currentValue}
          <span className="ml-2 text-sm font-medium text-gray-500">
            from {prevValue}
          </span>
        </div>

        <div
          className={cx(
            changeStatus === "positive"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800",
            "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
          )}
        >
          {changeType === "increase" ? (
            <ArrowSmUpIcon
              className={cx(
                "-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5",
                statusColor
              )}
              aria-hidden="true"
            />
          ) : (
            <ArrowSmDownIcon
              className={cx(
                "-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5",
                statusColor
              )}
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {changeType === "increase" ? "Increased" : "Decreased"} by
          </span>
          {change}
        </div>
      </dd>
    </div>
  );
};

export default Stat;
