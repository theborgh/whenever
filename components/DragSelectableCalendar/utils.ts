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

  // create new timeslot
  // const newTimeSlot = await prisma.timeSlot.create({
  //   data: {
  //     day: new Date(), // replace with the actual day
  //     startTime: 2, // replace
  //     endTime: 4, // replace
  //     availability: {
  //       connect: {
  //         id: userId, // works because userAvailabilityId is same as userId by design
  //       },
  //     },
  //   },
  // });

  return result;
  
  // await prisma.meeting.update({
  //   where: {
  //     id: meetingId,
  //   },
  //   data: {
  //     users: {
  //       update: {
  //         where: {
  //           id: userId,
  //         },
  //         data: {
  //           availability: {
  //             update: {
  //               timeRanges: {
                  
  //           },
  //         },
  //       },
  //     }
  //   },
  // });
}