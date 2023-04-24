"use client";

import React, { useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import styles from "@/styles/calendar.module.css";
import Dayform from "./components/Dayform";
import { useState } from "react";

const Calendar = (): JSX.Element => {
  //set the days of the month
  const firstDay = startOfMonth(new Date(2023, 3, 1)); // aplil 1, 2023
  const lastDay = endOfMonth(firstDay);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  const headerText = format(firstDay, "MMMM yyyy");
  const firstDayString = format(firstDay, "dd");
  const today = new Date();
  const currentDay = today.getDate();
  //used to find where the month will start
  const findWeekDay = firstDay.getDay();
  const emptyDays = [];
  //this will set "fake days" to corret where the month start
  for (let i = 0; i < findWeekDay; i++) {
    emptyDays.push(
      <li key={i} className={styles.otherMonth}>
        {26 + i}
      </li>
    );
  }

  //the day clicked in date form and the layout to display the date
  const [dayClicked, setDayClicked] = useState(parseInt(firstDayString));
  const [dayClickedLayout, setDayClickedLayout] = useState<JSX.Element | null>(
    null
  );

  function clickHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    let clickedElement = event.target as HTMLElement;
    let clickedElementText = clickedElement.textContent;

    let dayClickeded = clickedElementText ? parseInt(clickedElementText) : 0;

    if (clickedElementText) {
      setDayClicked(dayClickeded);
    }
  }
  //makes the date format into string
  const dayLayout = dayClicked;

  //updates every click because of useEfect being updated every time dayClicked updates
  useEffect(() => {
    const layout = (
      <div>
        <h3>{dayLayout != 0 ? dayLayout : firstDayString} de Abril de 2023</h3>
      </div>
    );
    setDayClickedLayout(layout);
  }, [dayClicked]);

  return (
    <div className="flex justify-center w-screen">
      <div className={`${styles.calendarWrapper}`}>
        <div className={styles.calendar}>
          <h2>{headerText}</h2>
          <ul className={styles.weekdays}>
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
          </ul>
          <div>
            <ul className={styles.days}>
              {emptyDays}
              {daysInMonth.map((day, index) => (
                <li
                  onClick={clickHandler}
                  key={index}
                  className={`${
                    styles[day.getDate() === currentDay ? "today" : ""]
                  } ${styles.otherDays}`}
                >
                  {day.getDate()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${styles.dayForm}`}>
          {dayClickedLayout}
          <Dayform date={dayClicked.toString()} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
