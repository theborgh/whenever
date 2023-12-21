'use client';

import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import DragSelectableCalendar from '@/components/DragSelectableCalendar/DragSelectableCalendar';
import styles from './page.module.css';
import SignInForm from '@/components/SignInForm/SignInForm';
import { findMeetingById } from './utils';
import { UserSlots } from '@/utils/types';
import { User } from '@prisma/client';
import GroupCalendar from '@/components/GroupCalendar/GroupCalendar';

export default function MeetingPage({ params }: { params: { id: string } }) {
  const [meetingData, setMeetingData] = useState<any>(null); // TODO: type this
  const [user, setUser] = useState<User | null>(null);

  const handleIsLogged = (userData: User) => {
    setUser(userData);
  };

  const handleUpdateMeeting = async (user: User, slots: UserSlots) => {
    setMeetingData(await findMeetingById(params.id));
  };

  useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        setMeetingData(await findMeetingById(params.id));
      };

      fetchData();
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      notifications.show({
        title: 'Copied to clipboard',
        message: `The link for ${meetingData?.name} has been copied to your clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!params.id || !meetingData) {
    return <div>Meeting not found</div>;
  }

  return (
    <div>
      <h1 className={styles.meetingName}>Meeting times for {meetingData?.name}</h1>
      <div className={styles.copyLink} onClick={handleCopy}>
        copy meeting link
      </div>
      {user && (
        <p>
          Click and drag the boxes below to select the times you are available for this meeting.
          Then share the link to this page so everyone can do the same! This way, you'll see at a
          glance when everyone is available.
        </p>
      )}
      <div className={styles.meetingContainer}>
        <div>
          <h2 className={styles.subtitle}>
            {user ? `Welcome, ${user.name}` : 'Sign in to add your availability'}
          </h2>
          <div>
            {user ? (
              <DragSelectableCalendar
                meetingData={meetingData}
                user={user}
                updateMeeting={handleUpdateMeeting}
              />
            ) : (
              <SignInForm meetingId={params.id} handleIsLogged={handleIsLogged} />
            )}
          </div>
        </div>
        <div className={styles.groupAvailability}>
          <h2 className={styles.subtitle}>Group availability</h2>
          <div className={styles.subtitle}>{meetingData.timezone} timezone</div>
          <GroupCalendar meeting={meetingData} />
        </div>
      </div>
    </div>
  );
}
