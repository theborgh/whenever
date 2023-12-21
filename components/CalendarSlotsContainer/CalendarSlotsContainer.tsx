import React from 'react';
import styled from 'styled-components';
import { countUsersAvailableInSlot } from './utils';
import { UserSlots } from '@/utils/types';
import './CalendarSlotsContainer.css';

interface Props {
  daysToDisplay: number;
  rowsToDisplay: number;
  dragSelectable?: boolean;
  initialSlots: UserSlots[];
}

const StyledCalendarSlotsContainer = styled.div<{ $daysToDisplay: number; $rowsToDisplay: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => `repeat(${props.$daysToDisplay}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.$rowsToDisplay}, 10px)`};
  gap: 0px 0px;
`;

const StyledCell = styled.div<{ $totalUsers: number; $availableUsers: number; $rowIndex: number }>`
  background-color: ${(props) => `rgba(63,255,0,${props.$availableUsers / props.$totalUsers})`};
  border-top: ${(props) => `${props.$rowIndex % 2 === 0 ? '1px solid #000' : 'none'}`};
  border-bottom: ${(props) => `${props.$rowIndex % 2 === 1 ? '1px solid #000' : 'none'}`};
`;

export default function CalendarSlotsContainer({
  daysToDisplay,
  rowsToDisplay,
  dragSelectable,
  initialSlots,
}: Props) {
  return (
    <StyledCalendarSlotsContainer
      $daysToDisplay={daysToDisplay}
      $rowsToDisplay={rowsToDisplay}
      id="elements-container"
    >
      {Array.from({ length: daysToDisplay * rowsToDisplay }, (_, i) => (
        <StyledCell
          $totalUsers={initialSlots.length}
          $availableUsers={countUsersAvailableInSlot(
            Math.floor(i / rowsToDisplay),
            i % rowsToDisplay,
            initialSlots
          )}
          $rowIndex={i % rowsToDisplay}
          data-testid={`day-${Math.floor(i / rowsToDisplay)}-cell-${i % rowsToDisplay}`}
          key={i}
          className={`${dragSelectable ? 'draggable-cell' : 'cell'}`}
        />
      ))}
    </StyledCalendarSlotsContainer>
  );
}
