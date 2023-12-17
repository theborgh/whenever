'use client';

import React, { useState } from 'react';
import { Box, Select, TextInput } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { schema, EmptyMeetingType } from '@/app/schema';
import { timezones, timezoneGuess } from '@/app/const';
import { createEmptyMeeting } from './utils';
import { useRouter } from 'next/navigation';
import styles from './CreateNewMeetingForm.module.css';
import '@mantine/dates/styles.css';

export default function CreateNewMeetingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      meetingName: 'New meeting',
      dateRange: [new Date(), new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)],
      startTime: '9:00',
      endTime: '18:00',
      timezone: timezoneGuess,
    },
    validate: zodResolver(schema),
    validateInputOnChange: true,
  });

  const handleFormSubmit = async (values: EmptyMeetingType) => {
    setIsLoading(true);
    const res = await createEmptyMeeting(values);
    setIsLoading(false);

    router.push(`/meeting/${res.id}`);
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleFormSubmit)} onReset={form.onReset}>
        <div className={styles.inputContainer}>
          <TextInput
            label="Meeting name"
            placeholder="Meeting name"
            {...form.getInputProps('meetingName')}
          />
        </div>
        <div className={styles.datetimeContainer}>
          <div className={styles.datepickerContainer}>
            <div>Range of possible dates for the meeting</div>
            <DatePicker
              type="range"
              minDate={new Date()}
              allowSingleDateInRange
              {...form.getInputProps('dateRange')}
            />
          </div>
          <div>
            <Select
              label="Start time"
              placeholder="Pick value"
              data={[...Array.from({ length: 24 }).map((_, index) => `${index}:00`)]}
              {...form.getInputProps('startTime')}
            />
            <Select
              label="End time"
              placeholder="Pick value"
              data={[...Array.from({ length: 24 }).map((_, index) => `${index}:00`)]}
              {...form.getInputProps('endTime')}
            />
          </div>
          <div>
            <Select
              label="Meeting timezone"
              placeholder="Type and select value"
              data={[...timezones]}
              searchable
              {...form.getInputProps('timezone')}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className={`${styles.submit} ${isLoading && styles.loading}`}
          >
            {isLoading ? 'Creating new meeting...' : 'Create meeting'}
          </button>
        </div>
      </form>
    </Box>
  );
}
