'use client';

import React, { useEffect, useState } from 'react';
import Selecto from 'react-selecto';
import './DragSelectableCalendar.css';
import { convertIntToTimeString } from '@/utils';

export default function DragSelectableCalendar() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [selectableTargets, setSelectableTargets] = useState<(string | HTMLElement | null)[]>([]);

  useEffect(() => {
    setContainer(document.body);
    setSelectableTargets(['.target', document.querySelector('.target2') as HTMLElement]);
  }, []);

  const daysToDisplay = 4;
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
        selectableTargets={['.element', document.querySelector('.target2') as HTMLElement]}
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
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.toggle('selected');
          });
          e.removed.forEach((el) => {
            el.classList.toggle('selected');
          });
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
        <div id="elements-container" className="elements-container">
          {Array.from({ length: daysToDisplay * rowsToDisplay }, (_, i) => (
            <div data-testid={`grid-cell-${i}`} key={i} className={`element`} />
          ))}
        </div>
      </div>
    </div>
  );
}
