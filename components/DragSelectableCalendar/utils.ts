'use server';
import { prisma } from '@/db';
import { Meeting } from '@prisma/client';

export interface Slot {
  dayIndex: number;
  slotArray: number[];
}

const constructTimeSlots = (meeting: Meeting, selectedIndices: Slot[]) => {
  const timeSlots = selectedIndices.map((slot) => {
    const day = new Date(meeting.startDay);
    day.setDate(day.getDate() + slot.dayIndex);

    return slot.slotArray.map((slotIndex) => {
      const startTime = slotIndex;
      const endTime = slotIndex + 1;
      return {
        day,
        startTime,
        endTime,
      };
    });
  });

  // aggregate all the time slots, so that if there is one from 2-3 and one from 3-4 from the same day, it becomes one from 2-4
  const aggregatedTimeSlots = timeSlots.map((daySlots) => {
    const aggregatedSlots = daySlots.reduce<(typeof daySlots)>((acc, curr) => {
      const lastSlot = acc[acc.length - 1];
      if (lastSlot && lastSlot.endTime === curr.startTime) {
        lastSlot.endTime = curr.endTime;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    return aggregatedSlots;
  }).flat();
  
  return aggregatedTimeSlots;
}

export const updateTimeslots = async (meeting: Meeting, userId: string, selectedIndices: Slot[]) => {
  let result;

  // construct an array of TimeSlots from the selectedIndices and the meeting start date
  const timeSlots = constructTimeSlots(meeting, selectedIndices); 

  console.log('aggregated time slots: ', timeSlots);

  // delete all the old timeslots with the same availabilityId
  await prisma.timeSlot.deleteMany({
    where: {
      availabilityId: userId,
    },
  });

  // create the new timeslots in the database
  result = await prisma.timeSlot.createMany({
    data: timeSlots.map((slot) => ({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      availabilityId: userId,
    })),
    skipDuplicates: true,
  });

  return result;
}

