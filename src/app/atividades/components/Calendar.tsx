import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse,
  set,
} from "date-fns";
import Dayform from "./Dayform";
import styles from "@/styles/calendar.module.css";

const Calendar = ({ month }: { month: string | null }): JSX.Element => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthName = today.getMonth();
  month = month ? month : currentMonthName.toString();
  const firstDay = startOfMonth(parse(month, "MMMM", new Date()));
  const lastDay = endOfMonth(firstDay);
  const firstDayWeek = firstDay.getDay();
  console.log("this is fist day", firstDay + "this is last day", lastDay);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  const firstDayString = format(firstDay, "dd");

  const [dayClicked, setDayClicked] = useState(parseInt(currentDay.toString()));
  const [dayOverlay, setDayOverlay] = useState(false);

  const [dayClickedLayout, setDayClickedLayout] = useState<JSX.Element | null>(
    <div>
      <h3>
        {dayClicked != 0 ? dayClicked : firstDayString} de {month} de 2023
      </h3>
    </div>
  );

  function togleDayOverlay() {
    setDayOverlay(!dayOverlay);
  }

  function clickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    let clickedElement = event.target as HTMLElement;
    let clickedElementText = clickedElement.textContent;
    let dayClickeded = clickedElementText ? parseInt(clickedElementText) : 0;
    togleDayOverlay();

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
  const emptyDays = [];
  for (let i = 0; i < firstDayWeek; i++) {
    emptyDays.push(<span key={i} className=" bg-gray-400"></span>);
  }
  const dayLayout = dayClicked;
  const emptySlotsBotton = 42 - daysInMonth.length - emptyDays.length;
  const emptyDaysBotton = [];
  for (let i = 0; i < emptySlotsBotton; i++) {
    emptyDaysBotton.push(
      <span key={i} className=" bg-gray-400 text-slate-500 ">
        {i + 1}
      </span>
    );
  }
  useEffect(() => {
    const layout = (
      <div>
        <h3>
          {dayLayout != 0 ? dayLayout : firstDayString} de {month} de 2023
        </h3>
      </div>
    );
    setDayClickedLayout(layout);
  }, [dayClicked, month]);

  return (
    <div className=" m-0 mr-8 ml-8 mb-8 w-s h-screen w-screen">
      <div className=" w-screen h-screen ">
        <div className={styles.calendarWrapper}>
          <ul className={styles.diasDaSemana}>
            <li className="">Dom</li>
            <li className="">Seg</li>
            <li className="">Tec</li>
            <li className="">Qua</li>
            <li className="">Qui</li>
            <li className="">Sex</li>
            <li className="">Sab</li>
          </ul>
          <div className="h-full w-full">
            <div className="grid grid-cols-7 grid-rows-6 h-full">
              {emptyDays}
              {daysInMonth.map((day, index) => (
                <span
                  onClick={clickHandler}
                  key={index}
                  className={`h-full w-full  ${
                    styles[day.getDate() === currentDay ? "today" : ""]
                  } m-0.5 bg-[#D54A4A] `}
                >
                  {day.getDate()}
                </span>
              ))}
              {emptyDaysBotton}
            </div>
          </div>
          {dayOverlay ? (
            <Dayform date={dayClicked.toString()} month={month} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
