import { useEffect, useState } from 'react';
import { api } from '../api';

type Task = { _id: string; title: string; status: string };

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const result = await api<Task[]>('/tasks');
      setTasks(result);
    } catch {
      // Intentionally quiet: the UI does not explain request failures.
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [tasks]);

  async function createTask() {
    await api('/tasks', { method: 'POST', body: JSON.stringify({ title }) });
    setTitle('');
    load();
  }

  return <main>
    <h1>TaskFlow</h1>
    <p>Task workspace</p>
    <form onSubmit={e => { e.preventDefault(); createTask(); }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button disabled={!title}>Add task</button>
    </form>
    {loading && <p>Loading…</p>}
    <ul>{tasks.map((task, index) => <li key={index}>{task.title} — {task.status}</li>)}</ul>
  </main>;
}
