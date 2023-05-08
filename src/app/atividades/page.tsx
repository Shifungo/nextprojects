"use client";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse,
} from "date-fns";
import React, { useEffect, useState } from "react";

import Calendar from "./components/Calendar";

const Page = (): JSX.Element => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const monthName = new Date(0, todayMonth)
    .toLocaleString("default", {
      month: "long",
    })
    .toLowerCase();
  console.log("monthName", monthName);
  const [month, setMonth] = useState<string>(monthName);
  const [monthLayout, setMonthLayout] = useState(false);

  const [monthChoose, setMonthChoose] = useState<JSX.Element | null>(
    <div></div>
  );

  function monthSelector() {
    setMonthLayout(!monthLayout);
  }
  console.log("monthL" + monthLayout);

  useEffect(() => {
    if (monthLayout) {
      setMonthChoose(
        <div>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("january")}
          >
            january
          </span>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("february")}
          >
            february
          </span>
          <span className=" m-2 border-black" onClick={() => setMonth("march")}>
            march
          </span>
          <span className=" m-2 border-black" onClick={() => setMonth("april")}>
            april
          </span>
          <span className=" m-2 border-black" onClick={() => setMonth("may")}>
            may
          </span>
          <span className=" m-2 border-black" onClick={() => setMonth("june")}>
            june
          </span>
          <span className=" m-2 border-black" onClick={() => setMonth("july")}>
            july
          </span>
          <span
            className=" m-2 border-blue-500"
            onClick={() => setMonth("august")}
          >
            august
          </span>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("september")}
          >
            september
          </span>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("october")}
          >
            october
          </span>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("november")}
          >
            november
          </span>
          <span
            className=" m-2 border-black"
            onClick={() => setMonth("december")}
          >
            december
          </span>
        </div>
      );
    }
  }, [monthLayout]);

  return (
    <div className="flex justify-center w-screen">
      <div className=" w-screen">
        <div>
          <button onClick={monthSelector}>{month}</button>
        </div>
        {monthChoose}
        <Calendar month={month} />
      </div>
    </div>
  );
};

export default Page;
