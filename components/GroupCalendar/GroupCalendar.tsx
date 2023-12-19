import React from 'react';
import { Meeting, TimeSlot, User, UserAvailability } from '@prisma/client';
import { UserSlots } from '@/utils/types';
import CalendarSlotsContainer from '../CalendarSlotsContainer/CalendarSlotsContainer';
import { convertIntToTimeString } from '@/utils';
import { setInitialSelectedIndicesForUser } from '@/utils/calendar';

type AvailabilityWithTimeslots = UserAvailability & { timeRanges: TimeSlot[] };
type UserWithAvailability = User & { availability: AvailabilityWithTimeslots };
type MeetingData = Meeting & { users: UserWithAvailability[] };

interface GroupCalendarProps {
  meeting: MeetingData;
}

export default function GroupCalendar({ meeting }: GroupCalendarProps) {
  const { startDay, endDay, startTime, endTime } = meeting;
  const allUsersTimeslots: UserSlots[] = meeting.users.map((user) => ({
    userId: user.id,
    slots: setInitialSelectedIndicesForUser(user, meeting),
  }));

  console.log(
    `[GROUP CALENDAR] has ${meeting.users.length} users: ${meeting.users.map((u) => u.name)}`
  );

  const daysToDisplay = Math.floor((endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24));
  const dayNamesFromStartDate = Array.from({ length: daysToDisplay }, (_, i) =>
    new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  );

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
        <CalendarSlotsContainer
          daysToDisplay={daysToDisplay}
          rowsToDisplay={endTime - startTime}
          initialSlots={allUsersTimeslots}
        />
      </div>
    </div>
  );
}
