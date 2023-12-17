'use client';

import { useState, useEffect } from 'react';
import DragSelectableCalendar from '@/components/DragSelectableCalendar/DragSelectableCalendar';
import styles from './page.module.css';
import SignInForm from '@/components/SignInForm/SignInForm';
import { findMeetingById } from './utils';
import { Meeting, User } from '@prisma/client';
import GroupCalendar from '@/components/GroupCalendar/GroupCalendar';

export default function MeetingPage({ params }: { params: { id: string } }) {
  const [meetingData, setMeetingData] = useState<Meeting | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleIsLogged = (userData: User) => {
    setUser(userData);
  };

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
          <h2>{user ? `Welcome, ${user.name}` : 'Sign in to add your availability'}</h2>
          <p>
            Click and drag the boxes below to select the times you are available for this meeting.
            Then share the link to this page so everyone can do the same! This way, you'll see at a
            glance when everyone is available.
          </p>
          <div>
            {user ? (
              <DragSelectableCalendar meetingData={meetingData} user={user} />
            ) : (
              <SignInForm meetingId={params.id} handleIsLogged={handleIsLogged} />
            )}
          </div>
        </div>
        <div className={styles.groupAvailability}>
          <h2>Group availability</h2>
          <GroupCalendar meeting={meetingData} />
        </div>
      </div>
    </div>
  );
}
