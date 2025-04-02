import { useEffect, useState } from 'react';

export default function TeamLeadsDashboard() {
  const [chatters, setChatters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-all-chatters')
      .then((res) => res.json())
      .then((data) => {
        setChatters(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (!Array.isArray(chatters)) return <p>Failed to load data</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Team Lead Dashboard</h1>
      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Creator</th>
            <th className="border p-2">Modules</th>
            <th className="border p-2">Requested</th>
            <th className="border p-2">Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {chatters.map((c, idx) => (
            <tr key={idx} className="border-t">
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.creator}</td>
              <td className="border p-2">{c.completedModules}/6</td>
              <td className="border p-2">{c.shadowingRequested}</td>
              <td className="border p-2">{c.shadowingScheduled ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
