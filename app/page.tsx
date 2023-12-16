import CreateNewMeetingForm from '@/components/CreateNewMeetingForm/CreateNewMeetingForm';

export default async function HomePage() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Create a new meeting</h2>
      <CreateNewMeetingForm />
    </section>
  );
}
