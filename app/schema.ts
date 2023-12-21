import { z } from 'zod';
import { timezonesWithOffsets } from '@/utils/const';

export const schema = z
.object({
  meetingName: z.string().min(1, { message: 'Name should have at least 1 letter' }),
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
.refine((data) => timezonesWithOffsets.map(
  (el) => `${el.name} (GMT${el.offset >= 0 ? '+' : ''}${el.offset})`
).includes(data.timezone), {
  message: 'Invalid timezone: please pick from the list',
  path: ['timezone'],
});

export type EmptyMeetingType = z.infer<typeof schema>;
