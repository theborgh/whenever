import React, { useEffect, useMemo, useState } from 'react';
import Selecto from 'react-selecto';
import CalendarSlotsContainer from '../CalendarSlotsContainer/CalendarSlotsContainer';
import './DragSelectableCalendar.css';
import { convertIntToTimeString } from '@/utils';
import { Slot, UserSlots } from '@/utils/types';
import { User } from '@prisma/client';
import { updateTimeslotsOnDB } from './utils';
import { setInitialSelectedIndicesForUser } from '../../utils/calendar';
import styled from 'styled-components';

interface DragSelectableCalendarProps {
  meetingData: any; // TODO: type this
  user: User;
  updateMeeting: (user: User, slots: UserSlots) => void;
}

const StyledContainer = styled.div<{ $daysToDisplay: number }>`
  width: ${(props) => `${(props.$daysToDisplay + 1) * 80}px`};
`;

const StyledDayNamesContainer = styled.div<{ $daysToDisplay: number }>`
  display: flex;
  width: ${(props) => `${(props.$daysToDisplay + 1) * 80}px`};
`;

export default function DragSelectableCalendar({
  meetingData,
  user,
  updateMeeting,
}: DragSelectableCalendarProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [selectableTargets, setSelectableTargets] = useState<(string | HTMLElement | null)[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Slot[]>([]);
  const { startDay, endDay, startTime, endTime } = meetingData;
  let tmpSelectedIndices = useMemo(() => [...selectedIndices], [selectedIndices]);
  let initialIndices: Slot[] = [];

  useEffect(() => {
    setContainer(document.body);
    setSelectableTargets(['.draggable-cell']);
  }, []);

  useEffect(() => {
    if (meetingData.users && meetingData.users.length) {
      initialIndices = setInitialSelectedIndicesForUser(user, meetingData);
      setSelectedIndices(initialIndices);
    }
  }, [user, meetingData]);

  const daysToDisplay = Math.floor((endDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24));
  const dayNamesFromStartDate = Array.from({ length: daysToDisplay }, (_, i) =>
    new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  );
  dayNamesFromStartDate.unshift('');

  if (!container || !selectableTargets.length) return null;

  return (
    <StyledContainer $daysToDisplay={daysToDisplay} className="container">
      <Selecto
        // The container to add a selection element
        container={document?.body}
        // The area to drag selection element (default: container)
        dragContainer={window}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={['.draggable-cell']}
        // Whether to select by click (default: true)
        selectByClick={true}
        // Whether to select from the target inside (default: true)
        selectFromInside={true}
        // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
        continueSelect={true}
        // Determines which key to continue selecting the next target via keydown and keyup.
        toggleContinueSelect={'shift'}
        // The container for keydown and keyup events
        keyContainer={window}
        // The rate at which the target overlaps the drag area to be selected. (default: 100)
        hitRate={0}
        onSelect={(e: any) => {
          e.added.forEach((el: HTMLElement) => {
            el.classList.toggle('selected');
            const testid = el.dataset!.testid ?? 'invalid';
            const dayIndex = Number(testid.split('-')[1]);
            const rowIndex = Number(testid.split('-')[3]);

            const slotIndex = tmpSelectedIndices.findIndex((slot) => slot.dayIndex === dayIndex);

            if (slotIndex !== -1) {
              const slot = tmpSelectedIndices.splice(slotIndex, 1)[0];
              const dayObj: Slot = {
                dayIndex: dayIndex,
                slotArray: slot.slotArray.includes(rowIndex)
                  ? slot.slotArray.filter((el) => el !== rowIndex)
                  : [...slot.slotArray, rowIndex].sort((a, b) => a - b),
              };

              tmpSelectedIndices.push(dayObj);
            } else {
              const dayObj: Slot = {
                dayIndex: dayIndex,
                slotArray: [rowIndex],
              };

              tmpSelectedIndices.push(dayObj);
            }
          });

          e.removed.forEach((el: HTMLElement) => {
            el.classList.toggle('selected');
            const testid = el.dataset!.testid ?? 'invalid';
            const dayIndex = Number(testid.split('-')[1]);
            const rowIndex = Number(testid.split('-')[3]);

            const slotIndex = tmpSelectedIndices.findIndex((slot) => slot.dayIndex === dayIndex);

            tmpSelectedIndices[slotIndex].slotArray.splice(
              tmpSelectedIndices[slotIndex].slotArray.indexOf(rowIndex),
              1
            );
          });
        }}
        onDragEnd={() => {
          setSelectedIndices(tmpSelectedIndices);
          updateTimeslotsOnDB(meetingData, user.id, tmpSelectedIndices);
          updateMeeting(user, { userId: user.id, slots: tmpSelectedIndices });
        }}
      />

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
            dragSelectable={true}
            initialSlots={[{ userId: user.id, slots: selectedIndices }]} // TODO: type this
          />
        </div>
      </div>
    </StyledContainer>
  );
}
