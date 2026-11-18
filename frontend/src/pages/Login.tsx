import { FormEvent, useState } from 'react';
import { api } from '../api';
import { saveSession, SessionUser } from '../auth';

export default function Login({ onSuccess }: { onSuccess: (user: SessionUser) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setPending(true);
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login'
        ? { email, password }
        : { email, password, ...(displayName.trim() ? { displayName: displayName.trim() } : {}) };
      const result = await api<{ accessToken: string; user: SessionUser }>(path, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      saveSession(result.accessToken, result.user);
      onSuccess(result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="stack" onSubmit={submit}>
      <h1>{mode === 'login' ? 'Sign in' : 'Create an account'}</h1>
      {mode === 'register' && (
        <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Display name" />
      )}
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required minLength={mode === 'register' ? 8 : 1} />
      {error && <p className="error">{error}</p>}
      <button disabled={pending}>{pending ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Register'}</button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login');
          setError('');
        }}
      >
        {mode === 'login' ? 'Need an account?' : 'Already registered?'}
      </button>
    </form>
  );
}
