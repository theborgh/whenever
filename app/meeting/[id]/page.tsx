'use client';

import { useState, useEffect } from 'react';
import DragSelectableCalendar from '@/components/DragSelectableCalendar/DragSelectableCalendar';
import styles from './page.module.css';
import SignInForm from '@/components/SignInForm/SignInForm';
import { findMeetingById } from './utils';
import { Meeting } from '@prisma/client';

export default function MeetingPage({ params }: { params: { id: string } }) {
  const [meetingData, setMeetingData] = useState<Meeting | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        setMeetingData(await findMeetingById(params.id));
      };

      fetchData();
    }
  }, []);

  if (!params.id || !meetingData) {
    return <div>Meeting not found</div>;
  }

  return (
    <div>
      <h1 className={styles.meetingName}>Meeting times for {meetingData?.name}</h1>
      <div className={styles.meetingContainer}>
        <div>
          <h2>Sign in to add your availability</h2>
          <div>
            {isLogged ? (
              <DragSelectableCalendar meetingData={meetingData} />
            ) : (
              <SignInForm meetingId={params.id} />
            )}
          </div>
        </div>
        <div className={styles.groupAvailability}>
          <h2>Group availability</h2>
          <DragSelectableCalendar meetingData={meetingData} />
        </div>
      </div>
    </div>
  );
}
