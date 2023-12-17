'use client';

import React, { useEffect, useState } from 'react';
import Selecto from 'react-selecto';
import CalendarSlotsContainer from './CalendarSlotsContainer/CalendarSlotsContainer';
import './DragSelectableCalendar.css';
import { convertIntToTimeString } from '@/utils';

interface Slot {
  dayIndex: number;
  slotArray: number[];
}

export default function DragSelectableCalendar() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [selectableTargets, setSelectableTargets] = useState<(string | HTMLElement | null)[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Slot[]>([]);
  let tmpSelectedIndices = [...selectedIndices];

  console.log('selectedIndices', selectedIndices);

  useEffect(() => {
    setContainer(document.body);
    setSelectableTargets(['.target', document.querySelector('.target2') as HTMLElement]);
  }, []);

  const daysToDisplay = 5;
  const rowsToDisplay = 16;
  const startTime = 32;
  const endTime = 64;

  if (!container || !selectableTargets.length) return null;

  return (
    <div className="container">
      <Selecto
        // The container to add a selection element
        container={document?.body}
        // The area to drag selection element (default: container)
        dragContainer={window}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={['.element']}
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
                slotArray: [...slot.slotArray, rowIndex],
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
        }}
      />

      <div className="calendarContainer">
        <div className="timesOfDayContainer">
          {Array.from({ length: rowsToDisplay }, (_, i) => (
            <div className="timeOfDay" key={i}>
              {convertIntToTimeString(i + startTime)}
            </div>
          ))}
        </div>
        <CalendarSlotsContainer daysToDisplay={daysToDisplay} rowsToDisplay={rowsToDisplay} />
      </div>
    </div>
  );
}
