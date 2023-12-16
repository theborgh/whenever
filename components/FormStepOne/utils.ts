'use server';

import { prisma } from '@/db';
import { EmptyMeetingType } from '@/app/schema';
import { convertTimeStringToInt } from '@/utils';

export const createEmptyMeeting = async (data: EmptyMeetingType) => {
  await prisma.meeting.create({
    data: {
      name: data.meetingName,
      startDay: data.dateRange[0] ?? '',
      endDay: data.dateRange[1] ?? '',
      startTime: convertTimeStringToInt(data.startTime),
      endTime: convertTimeStringToInt(data.endTime),
      timezone: data.timezone,
    },
  });
};
