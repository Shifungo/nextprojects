import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse,
} from "date-fns";
import Dayform from "./Dayform";
import styles from "@/styles/calendar.module.css";

const Calendar = ({ month }: { month: string | null }): JSX.Element => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthName = today.getMonth();
  month = month ? month : currentMonthName.toString();
  const firstDay = startOfMonth(parse(month, "MMMM", new Date()));
  console.log("this is the first day", firstDay);
  const lastDay = endOfMonth(firstDay);
  const firstDayWeek = firstDay.getDay();
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  const headerText = format(firstDay, "MMMM yyyy");
  const firstDayString = format(firstDay, "dd");

  const [dayClicked, setDayClicked] = useState(parseInt(currentDay.toString()));

  const [dayClickedLayout, setDayClickedLayout] = useState<JSX.Element | null>(
    <div>
      <h3>
        {dayClicked != 0 ? dayClicked : firstDayString} de {month} de 2023
      </h3>
    </div>
  );
  const emptyDays = [];

  function clickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    let clickedElement = event.target as HTMLElement;
    let clickedElementText = clickedElement.textContent;

    let dayClickeded = clickedElementText ? parseInt(clickedElementText) : 0;

    if (clickedElement) {
      document.querySelectorAll("span").forEach((element) => {
        element.classList.remove("border");
        element.classList.remove("border-white");
        element.classList.remove("border-2");
        clickedElement.classList.add("border");
        clickedElement.classList.add("border-white");
        clickedElement.classList.add("border-2");
      });
    }

    if (clickedElementText) {
      setDayClicked(dayClickeded);
    }
  }

  for (let i = 0; i < firstDayWeek; i++) {
    emptyDays.push(<span key={i}> </span>);
  }

  const dayLayout = dayClicked;

  useEffect(() => {
    const layout = (
      <div>
        <h3>
          {dayLayout != 0 ? dayLayout : firstDayString} de {month} de 2023
        </h3>
      </div>
    );
    setDayClickedLayout(layout);
  }, [dayClicked]);
  console.log("this is month" + month);
  return (
    <div className=" m-8 w-s">
      <div className="flex w-screen">
        <div className=" mx-4 w-1/2 h-screen">
          <h2>{headerText}</h2>
          <ul className=" bg-orange-500 grid grid-cols-7 border-4 border-black ">
            <li className="border-4 border-green">Dom</li>
            <li className="border-4 border-green">Seg</li>
            <li className="border-4 border-green">Tec</li>
            <li className="border-4 border-green">Qua</li>
            <li className="border-4 border-green">Qui</li>
            <li className="border-4 border-green">Sex</li>
            <li className="border-4 border-green">Sab</li>
          </ul>
          <div className="h-screen">
            <div className="grid grid-cols-7 grid-rows-5 w-full h-5/6">
              {emptyDays}
              {daysInMonth.map((day, index) => (
                <span
                  onClick={clickHandler}
                  key={index}
                  className={` ${
                    styles[day.getDate() === currentDay ? "today" : ""]
                  } m-0.5 bg-orange-500 `}
                >
                  {day.getDate()}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`h-5/6 ${styles.dayForm}`}>
          {dayClickedLayout}
          <Dayform date={dayClicked.toString()} month={month} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
