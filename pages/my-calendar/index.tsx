import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

import { publicHolidays } from "@context/api";

import { IHoliday } from "types/holiday";
import { IMyDay } from "types/myday";

import "react-calendar/dist/Calendar.css";

export default function CalendarComponent() {
  const [value, setValue] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [eventList, setEventList] = useState<IMyDay[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState("");

  const getHolidays = async () => {
    const holidays = await publicHolidays(year);

    let holidayDates: string[] = [""];
    let publicHolidayList = holidays.map((holiday: IHoliday) => {
      holidayDates = [...holidayDates, holiday.date];
      return {
        date: holiday.date,
        name: holiday.localName,
        global: holiday.global,
      };
    });

    const myDayList = localStorage.getItem("myDayList");

    if (myDayList)
      publicHolidayList = [...publicHolidayList, ...JSON.parse(myDayList)];

    setEventList(publicHolidayList);
  };

  const saveEvent = () => {
    const _newEvent = {
      _id: Math.random().toString(36).substr(2, 11),
      date: moment(value).format("YYYY-MM-DD"),
      name: newEvent,
      global: false,
    };

    const _eventList = [...eventList, _newEvent];

    const myDayList = localStorage.getItem("myDayList");
    if (myDayList) {
      const parseMyDayList = JSON.parse(myDayList);

      localStorage.setItem(
        "myDayList",
        JSON.stringify([...parseMyDayList, _newEvent])
      );
    } else {
      localStorage.setItem("myDayList", JSON.stringify([_newEvent]));
    }

    setEventList(_eventList);
    setNewEvent("");
    setIsAddEvent(false);
  };

  const deleteEvent = (targetEvent: IMyDay) => {
    const myDayList = localStorage.getItem("myDayList");
    if (myDayList) {
      const parseMyDayList = JSON.parse(myDayList);

      const filterMyDayList = parseMyDayList.filter(
        (myday: IMyDay) => myday._id !== targetEvent._id
      );

      const _eventList = eventList.filter(
        (myday: IMyDay) => myday._id !== targetEvent._id
      );

      setEventList(_eventList);
      localStorage.setItem("myDayList", JSON.stringify(filterMyDayList));
    }
  };

  useEffect(() => {
    getHolidays();
  }, [year]);

  useEffect(() => {}, [eventList]);

  return (
    <>
      <Calendar
        locale="ko"
        onChange={(value: any) => {
          if (new Date(value).getFullYear() !== year) {
            setYear(new Date(value).getFullYear());
          }
          setValue(moment(value).format("YYYY-MM-DD"));
        }}
        formatDay={(_, date) =>
          new Date(date).toLocaleDateString("en-us", {
            day: "2-digit",
          })
        }
        value={value}
        next2Label={null}
        prev2Label={null}
        className="!w-full border-b"
        view="month"
        tileClassName="h-24 !p-0"
        tileContent={({ date }) => {
          const event = eventList.filter(
            (x) => x.date === moment(date).format("YYYY-MM-DD")
          );

          if (event) {
            return (
              <div className="flex flex-col gap-0.5">
                {event.map((e) => {
                  return (
                    <div
                      className={`top-8 w-full text-xs text-left  rounded-sm ${
                        moment(date).isSame(value)
                          ? "text-white"
                          : e.global
                          ? "bg-[#ff000040] text-black"
                          : "bg-orange-200 text-black"
                      } `}
                    >
                      {e.name}
                    </div>
                  );
                })}
              </div>
            );
          }
        }}
      />
      <div>
        <div className="flex items-center justify-between mt-5">
          <div className="text-gray-500">
            {moment(value).format("YYYY년 MM월 DD일")}
          </div>
          <button
            onClick={() => {
              setNewEvent("");
              setIsAddEvent(!isAddEvent);
            }}
            className="hover:text-white hover:bg-orange-500 p-2 text-orange-500 border border-orange-500 rounded-lg"
          >
            기념일 추가하기
          </button>
        </div>
        {isAddEvent && (
          <div className="flex w-full gap-2 mt-4">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => {
                setNewEvent(e.target.value);
              }}
              placeholder="기념일을 작성해주세요!"
              className=" p-2 border rounded-lg"
            />
            <button
              onClick={saveEvent}
              className="hover:text-white hover:bg-orange-500 w-8 px-2 text-orange-500 border border-orange-500 rounded-lg"
            >
              등록
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          {eventList
            .filter((event: IMyDay) => event.date === value)
            .map((event: IMyDay) => {
              return (
                <div className="flex items-center gap-2" key={event._id}>
                  <div>{event.name}</div>
                  {!event.global && (
                    <button
                      onClick={() => deleteEvent(event)}
                      className="hover:border-red-600 hover:text-red-600 px-2 py-1 border rounded-lg"
                    >
                      삭제
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
