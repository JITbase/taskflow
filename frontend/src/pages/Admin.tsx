export default function Admin() {
  // UI visibility is not a substitute for server-side authorization.
  const role = localStorage.getItem('role');
  if (role !== 'ADMIN') return <p>Not authorized</p>;
  return <main><h1>Administration</h1><p>User management</p></main>;
}
