import FormStepOne from '@/components/FormStepOne/FormStepOne';

export async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getData();

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Create a new meeting</h2>
      <FormStepOne />
      {data.title}
      {data.completed}
    </section>
  );
}
