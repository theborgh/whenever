import { prisma } from '@/db';

import React from 'react';

export default async function MeetingPage({ params }: { params: { id: string } }) {
  let meetingData;

  if (params.id) {
    meetingData = await prisma.meeting.findUnique({
      where: {
        id: params.id,
      },
    });
    console.log('fetched the meeting: ', meetingData);
  }

  return (
    <div>
      <h1>{meetingData?.name}</h1>
      <div>
        <div>Sign in form</div>
        <div>Group availability (server component)</div>
      </div>
    </div>
  );
}
