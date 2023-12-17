import React from 'react';
import { Meeting } from '@prisma/client';
import CalendarSlotsContainer from '../CalendarSlotsContainer/CalendarSlotsContainer';
import { convertIntToTimeString } from '@/utils';

interface GroupCalendarProps {
  meeting: Meeting;
}

export default function GroupCalendar({ meeting }: GroupCalendarProps) {
  const { startDay, endDay, startTime, endTime } = meeting;

  const daysToDisplay = Math.floor((endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24));
  const dayNamesFromStartDate = Array.from({ length: daysToDisplay }, (_, i) =>
    new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  );
  dayNamesFromStartDate.unshift('Time');

  return (
    <div className="calendarContainer">
      <div className="dayNamesContainer">
        {dayNamesFromStartDate.map((day, i) => (
          <div className="dayName" key={i}>
            {day}
          </div>
        ))}
      </div>
      <div className="timesContainer">
        <div className="timesOfDayContainer">
          {Array.from({ length: endTime - startTime }, (_, i) => (
            <div className="timeOfDay" key={i}>
              {convertIntToTimeString(startTime + i)}
            </div>
          ))}
        </div>
        <CalendarSlotsContainer daysToDisplay={daysToDisplay} rowsToDisplay={endTime - startTime} />
      </div>
    </div>
  );
}
