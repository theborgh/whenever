'use client';

import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function DateSelector() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return <DatePicker type="range" value={value} onChange={setValue} />;
}
