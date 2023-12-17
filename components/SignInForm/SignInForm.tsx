'use client';

import React from 'react';
import { Box, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './SignInForm.module.css';
import '@mantine/dates/styles.css';

interface LoginType {
  userName: string;
  userPassword: string;
}

export default function SignIn() {
  const form = useForm({
    initialValues: {
      userName: '',
      userPassword: '',
    },
    validate: {
      userName: (value) => (value.trim().length > 0 ? null : 'Name is required'),
    },
    validateInputOnChange: true,
  });

  const handleFormSubmit = async (values: LoginType) => {
    console.log('user logging in with data: ', values);

    // const res = await createEmptyMeeting(values);
    // router.push(`/meeting/${res.id}`);
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
          <div className={styles.inputContainer}>
            <PasswordInput
              label="Password"
              description="Optional, meeting-specific, used to change your availability"
              placeholder="Password"
              {...form.getInputProps('userPassword')}
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className={styles.submit}>
              Login
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
}
