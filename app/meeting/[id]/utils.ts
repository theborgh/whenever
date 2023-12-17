'use server';
import { prisma } from '@/db';

export const findMeetingById = async (meetingId: string) => {
  const result = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
  });

  return result;
};