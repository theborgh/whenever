'use client';

import { useState } from 'react';
import { Box, Select, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginWithCredentials } from '@/components/SignInForm/utils';
import { timezones, timezoneGuess } from '@/app/const';
import styles from './SignInForm.module.css';
import '@mantine/dates/styles.css';
import { User } from '@prisma/client';

export interface LoginType {
  userName: string;
  userPassword: string;
}

interface SignInProps {
  meetingId: string;
  handleIsLogged: (userData: User) => void;
}

export default function SignIn({ meetingId, handleIsLogged }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      userName: '',
      userTimezone: timezoneGuess,
      userPassword: '',
    },
    validate: {
      userName: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      userTimezone: (value) => (timezones.includes(value) ? null : 'Timezone is required'),
    },
    validateInputOnChange: true,
  });

  const handleFormSubmit = async (values: LoginType) => {
    let userData;

    try {
      setIsLoading(true);
      userData = await loginWithCredentials(meetingId, form.values.userTimezone, values);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    if (userData) {
      handleIsLogged(userData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Box mx="auto">
        <form onSubmit={form.onSubmit(handleFormSubmit)} onReset={form.onReset}>
          <div className={styles.inputContainer}>
            <TextInput
              label="Your name"
              placeholder="Your name"
              description="The name that will be displayed to other users"
              {...form.getInputProps('userName')}
            />
          </div>
          <div>
            <Select
              label="Preferred timezone"
              placeholder="Type and select value"
              description="Used to display times in your local timezone"
              data={[...timezones]}
              searchable
              {...form.getInputProps('userTimezone')}
            />
          </div>
          <div className={styles.inputContainer}>
            <PasswordInput
              label="Password"
              description="Optional, meeting-specific, used to change your availability"
              placeholder="Password"
              {...form.getInputProps('userPassword')}
            />
          </div>

          <div className="flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className={`${styles.submit} ${isLoading && styles.loading}`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
}
