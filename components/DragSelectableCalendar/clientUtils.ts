'use client';

import { User } from '@prisma/client';
import { Slot } from './utils';

export const setInitialSelectedIndicesForUser = (user: User, meetingData: any): Slot[] => {
  console.info('[setInitialSelectedIndicesForUser PARAMS]: user: ', user, 'meetingData is: ', meetingData)
  const result: Slot[] = []; // each Slot is an object with a dayIndex and a slotArray

  if(!meetingData.users.find((u: any) => u.id === user.id)) { console.log('user not found'); return [];}

  const timeSlotsForUser = meetingData.users.find((u: any) => u.id === user.id).availability.timeRanges;
  
  // iterate through the timeslots and add the dayIndex and slotIndex to the result array.
  // timeRanges[i].day is the timestamp for the slot, the starting day of the meeting is in meetingData.startDay

  if(!timeSlotsForUser) { console.log('cannot find timeslots for user'); return []; }
  
  timeSlotsForUser.forEach((timeSlot: any) => {
    const slotsToPush: number[] = [];
    const dayIndex = Math.floor((timeSlot.day - meetingData.startDay) / (24 * 60 * 60 * 1000));

    for (let i = timeSlot.startTime; i <= timeSlot.endTime; i++) {
      slotsToPush.push(i);
    }

    const slot = result.find((s) => s.dayIndex === dayIndex);
    if (slot) {
      slot.slotArray.push(...slotsToPush);
    } else {
      result.push({
        dayIndex,
        slotArray: [...slotsToPush],
      });
    }
  });

  return result;
}