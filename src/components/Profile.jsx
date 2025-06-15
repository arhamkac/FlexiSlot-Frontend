import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth(); // Already fetched in AuthContext
  const bookings = user?.bookings || [];

  if (!user) return <div className="text-white p-8">Loading Profile...</div>;

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-10 px-6">
      <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-md max-w-xl mx-auto border border-[#333]">
        <h1 className="text-3xl font-bold text-[#00f2fe] mb-4">👤 Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        <h2 className="text-2xl text-[#f97102] mb-4">📅 Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-[#999]">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li key={b.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                <p><strong>Category:</strong> {b.slot.category}</p>
                <p><strong>Room:</strong> {b.slot.slotType.room.name}</p>
                <p><strong>Date:</strong> {b.slot.date}</p>
                <p><strong>Time:</strong> {b.slot.slotType.startTime} - {b.slot.slotType.endTime}</p>
                <p><strong>Purpose:</strong> {b.purpose}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
