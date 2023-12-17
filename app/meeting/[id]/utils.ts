'use server';
import { prisma } from '@/db';

export const findMeetingById = async (meetingId: string) => {
  const result = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    include: {
      users: {
        where: {
          id: {
            startsWith: meetingId,
          }
        },
        include: {
          availability: {
            include: {
              timeRanges: true,
            }
          }
        },
      },
    },
  });

  console.log('result: ', result);

  return result;
};