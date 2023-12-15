import { Select } from '@mantine/core';
import moment from 'moment-timezone';
import DateSelector from '@/components/DateSelector/DateSelector';
import styles from './page.module.css';

export default function HomePage() {
  const timezones = moment.tz.names();

  console.log(timezones);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Create a new meeting</h2>
      <form>
        <input className={styles.form__input} type="text" placeholder="Meeting name" />
        <div className={styles.form__datetimeContainer}>
          <div>
            <div>Range of possible dates for the meeting</div>
            <DateSelector />
          </div>
          <div>
            <Select
              label="Start time"
              placeholder="Pick value"
              data={[...Array.from({ length: 24 }).map((_, index) => `${index}:00`)]}
            />
            <Select
              label="End time"
              placeholder="Pick value"
              data={[...Array.from({ length: 24 }).map((_, index) => `${index}:00`)]}
            />
          </div>
          <div className={styles.form__datetimeContainer}>
            <Select
              label="Timezone"
              placeholder="Type and select value"
              data={[...timezones]}
              searchable
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className={styles.form__submit}>
            Create meeting
          </button>
        </div>
      </form>
    </section>
  );
}
