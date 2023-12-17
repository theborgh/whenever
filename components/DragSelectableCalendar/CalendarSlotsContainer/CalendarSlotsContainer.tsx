import React from 'react';
import styled from 'styled-components';

interface Props {
  daysToDisplay: number;
  rowsToDisplay: number;
}

const StyledCalendarSlotsContainer = styled.div<{ $daysToDisplay: number; $rowsToDisplay: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${(props) => `repeat(${props.$daysToDisplay}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.$rowsToDisplay}, 20px)`};
  gap: 0px 0px;
`;

export default function CalendarSlotsContainer({ daysToDisplay, rowsToDisplay }: Props) {
  return (
    <StyledCalendarSlotsContainer
      $daysToDisplay={daysToDisplay}
      $rowsToDisplay={rowsToDisplay}
      id="elements-container"
    >
      {Array.from({ length: daysToDisplay * rowsToDisplay }, (_, i) => (
        <div data-testid={`grid-cell-${i}`} key={i} className={`element`} />
      ))}
    </StyledCalendarSlotsContainer>
  );
}
