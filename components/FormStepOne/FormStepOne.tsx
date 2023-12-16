'use client';

import React from 'react';
import { Box, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import moment from 'moment-timezone';
import styles from './FormStepOne.module.css';
import '@mantine/dates/styles.css';

export default function FormStepOne() {
  const timezones = moment.tz.names();

  const form = useForm({
    initialValues: {
      dateRange: [new Date(), new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)],
      meetingName: 'New meeting',
      startTime: '9:00',
      endTime: '18:00',
      timezone: moment.tz.guess(),
    },

    validate: {
      meetingName: (value) => (value.length > 0 ? null : 'Meeting name is required'),
      timezone: (value) => (timezones.includes(value) ? null : 'Invalid timezone'),
    },
    validateInputOnChange: true,
  });

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))} onReset={form.onReset}>
        <div className={styles.form__inputContainer}>
          <TextInput
            label="Meeting name"
            placeholder="Meeting name"
            {...form.getInputProps('meetingName')}
          />
        </div>
        <div className={styles.form__datetimeContainer}>
          <div>
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
          <div className={styles.form__datetimeContainer}>
            <Select
              label="Your timezone"
              placeholder="Type and select value"
              data={[...timezones]}
              searchable
              {...form.getInputProps('timezone')}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className={styles.form__submit}>
            Create meeting
          </button>
        </div>
      </form>
    </Box>
  );
}
