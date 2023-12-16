import { z } from 'zod';
import { timezones } from '@/app/const';

export const schema = z
.object({
  meetingName: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  dateRange: z.array(z.date().nullable()).refine((arr) => arr && arr[0] !== null, {
    message: 'First date cannot be null',
    path: ['dateRange'],
  }),
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
})
.refine((data) => Number(data.endTime.split(':')[0]) > Number(data.startTime.split(':')[0]), {
  message: 'End time must be greater than start time',
  path: ['endTime'],
})
.refine((data) => timezones.includes(data.timezone), {
  message: 'Invalid timezone: please pick from the list',
  path: ['timezone'],
});
