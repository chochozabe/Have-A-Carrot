import { useEffect, useState } from "react";

import { publicHolidays } from "@context/api";
import { IHoliday } from "types/holiday";
import React from "react";
import moment from "moment";

export default function PublicHolidays() {
  const [holidayList, setHolidayList] = useState([]);
  const [date, setDate] = useState(new Date());

  const getHolidays = async () => {
    const holidays = await publicHolidays(date.getFullYear());

    setHolidayList(holidays);
  };

  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-2xl">📍</div>
        <div className="text-md mb-2 font-bold">
          오늘 날짜 : {moment(date).format("YYYY-MM-DD dddd")}
        </div>
      </div>
      <div className=" divide gap-y-3 grid grid-cols-4 border auto-rows-[40px] px-3 cursor-default">
        {holidayList &&
          holidayList.map((holiday: IHoliday) => {
            const isPast = moment(holiday.date).isBefore(date);
            const diffDay = moment(holiday.date).diff(date, "d");

            return (
              <React.Fragment key={holiday.name}>
                <div className={`${isPast && "text-gray-500"} my-auto`}>
                  {holiday.date} ({moment(holiday.date).format("dddd")})
                </div>
                <div
                  className={`${isPast && "text-gray-500"} col-span-3 my-auto`}
                >
                  {holiday.localName} (
                  {diffDay < 0
                    ? "D+" + diffDay.toString().slice(1)
                    : "D-" + diffDay}
                  )
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
