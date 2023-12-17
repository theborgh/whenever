import React from 'react';
import { prisma } from '@/db';
import DragSelectableCalendar from '@/components/DragSelectableCalendar/DragSelectableCalendar';
import styles from './page.module.css';
import SignInForm from '@/components/SignInForm/SignInForm';

export default async function MeetingPage({ params }: { params: { id: string } }) {
  let meetingData;

  // if (params.id) {
  //   meetingData = await prisma.meeting.findUnique({
  //     where: {
  //       id: params.id,
  //     },
  //   });
  //   console.log('fetched the meeting: ', meetingData);
  // }

  return (
    <div>
      {/* <h1>{meetingData?.name}</h1> */}
      <div className={styles.meetingContainer}>
        <div>
          <h2>Sign in to add your availability</h2>
          <div>
            <SignInForm />
          </div>
        </div>
        <div className={styles.groupAvailability}>
          <h2>Group availability</h2>
          <DragSelectableCalendar />
        </div>
      </div>
    </div>
  );
}
