import React from 'react';
import styled from 'styled-components';
import { isInitiallySelected } from './utils';

interface Props {
  daysToDisplay: number;
  rowsToDisplay: number;
  dragSelectable?: boolean;
  meetingData?: any; // TODO: type this
}

const StyledCalendarSlotsContainer = styled.div<{ $daysToDisplay: number; $rowsToDisplay: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => `repeat(${props.$daysToDisplay}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.$rowsToDisplay}, 20px)`};
  gap: 0px 0px;
`;

export default function CalendarSlotsContainer({
  daysToDisplay,
  rowsToDisplay,
  dragSelectable,
  meetingData,
}: Props) {
  return (
    <StyledCalendarSlotsContainer
      $daysToDisplay={daysToDisplay}
      $rowsToDisplay={rowsToDisplay}
      id="elements-container"
    >
      {Array.from({ length: daysToDisplay * rowsToDisplay }, (_, i) => (
        <div
          data-testid={`day-${Math.floor(i / rowsToDisplay)}-cell-${i % rowsToDisplay}`}
          key={i}
          className={`${dragSelectable ? 'draggable-cell' : 'cell'} ${
            isInitiallySelected(i, daysToDisplay, rowsToDisplay, meetingData) && 'selected'
          }`}
        />
      ))}
    </StyledCalendarSlotsContainer>
  );
}
