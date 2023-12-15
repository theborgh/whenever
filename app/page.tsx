import styles from './page.module.css';
import DateSelector from '@/components/DateSelector/DateSelector';

export default function HomePage() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Create a new meeting</h2>
      <form>
        <input className={styles.form__input} type="text" placeholder="Meeting name" />
        <div className="flex gap-2 justify-between">
          <DateSelector />
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
