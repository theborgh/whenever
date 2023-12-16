'use server';

import { convertTimeStringToInt } from '@/utils';
import { EmptyMeetingType } from '@/app/schema';
import { prisma } from '@/db';

export const createEmptyMeeting = async (data: EmptyMeetingType) => {
  const response = await prisma.meeting.create({
    data: {
      name: data.meetingName,
      startDay: data.dateRange[0] ?? '',
      endDay: data.dateRange[1] ?? '',
      startTime: convertTimeStringToInt(data.startTime),
      endTime: convertTimeStringToInt(data.endTime),
      timezone: data.timezone,
    },
  });

  return response;
};
