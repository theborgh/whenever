import React from 'react';
import { Meeting, TimeSlot, User, UserAvailability } from '@prisma/client';
import { UserSlots } from '@/utils/types';
import CalendarSlotsContainer from '../CalendarSlotsContainer/CalendarSlotsContainer';
import { convertIntToTimeString } from '@/utils';
import { setInitialSelectedIndicesForUser } from '@/utils/calendar';
import styled from 'styled-components';

type AvailabilityWithTimeslots = UserAvailability & { timeRanges: TimeSlot[] };
type UserWithAvailability = User & { availability: AvailabilityWithTimeslots };
type MeetingData = Meeting & { users: UserWithAvailability[] };

interface GroupCalendarProps {
  meeting: MeetingData;
}

const StyledDayNamesContainer = styled.div<{ $daysToDisplay: number }>`
  display: flex;
  width: ${(props) => `${(props.$daysToDisplay + 1) * 80}px`};
`;

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
  dayNamesFromStartDate.unshift('');

  return (
    <div className="calendarContainer">
      <StyledDayNamesContainer $daysToDisplay={daysToDisplay}>
        {dayNamesFromStartDate.map((day, i) => (
          <div style={{ width: '80px' }} key={i}>
            <div className="dayName">{day.split(' ')[0]}</div>
            <div className="dayName">
              {day.split(' ')[1]} {day.split(' ')[2]}
            </div>
          </div>
        ))}
      </StyledDayNamesContainer>
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
