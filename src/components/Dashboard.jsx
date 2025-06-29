import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 Use AuthContext here

  if (!user) return <div className="text-white p-10">Loading Dashboard...</div>;

  const bookings = user.bookings || [];
  const upcoming = bookings.filter(b => new Date(b.slot.date) >= new Date());
  const past = bookings.filter(b => new Date(b.slot.date) < new Date());

  const cancelBooking = (id) => {
    alert(`Cancel booking with ID ${id} (mock)`); // 🔜 Replace with actual cancel logic
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <h1 className="text-[36px] font-bold text-center text-[#00f2fe] mb-6">
        Welcome, {user.name}!
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <MetricCard label="Total Bookings" value={bookings.length} color="#00f2fe" />
        <MetricCard label="Upcoming Bookings" value={upcoming.length} color="#00ff11" />
        <MetricCard label="Past Bookings" value={past.length} color="#8888ff" />
        <MetricCard label="Cancelled Bookings" value={0} color="#ff00ff" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-[28px] text-[#f97102] mb-4 text-center">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-12">
        {[
          { label: 'Manage Bookings', path: '/bookingstatus', icon: '📅' },
          { label: 'Add Slot', path: '/booking', icon: '➕' },
          { label: 'User Queries', path: '/contact', icon: '❓' },
          { label: 'About Us', path: '/aboutus', icon: 'ℹ️' },
        ].map(({ label, path, icon }, idx) => (
          <div
            key={idx}
            onClick={() => navigate(path)}
            className="cursor-pointer bg-[#1a1a1a] p-6 rounded-2xl text-center transition transform hover:scale-105
                      shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]"
          >
            <div className="text-[36px] mb-3">{icon}</div>
            <p className="text-[18px] font-semibold text-white hover:text-[#00f2fe] transition-all">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <h2 className="text-[28px] text-[#f97102] mb-4">Upcoming Bookings</h2>
      <BookingList bookings={upcoming} canCancel cancelBooking={cancelBooking} />

      <h2 className="text-[28px] text-[#f97102] mt-10 mb-4">Past Bookings</h2>
      <BookingList bookings={past} />
    </section>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div
      className="bg-[#111] p-6 rounded-2xl shadow-lg text-center border-2"
      style={{ borderColor: color }}
    >
      <h3 className="text-[20px] mb-2 text-[#b0bec5]">{label}</h3>
      <p className="text-[32px] font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function BookingList({ bookings, cancelBooking, canCancel }) {
  if (bookings.length === 0)
    return <p className="text-[#999] mb-6">No bookings found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map(b => (
        <div key={b.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] shadow-md">
          <h3 className="text-lg text-[#00f2fe] font-semibold">
            {b.slot.category} — {b.slot.slotType.room.name}
          </h3>
          <p>📅 {b.slot.date}</p>
          <p>⏰ {b.slot.slotType.startTime} - {b.slot.slotType.endTime}</p>
          <p className="text-sm text-[#aaa]">Purpose: {b.purpose}</p>
          {canCancel && (
            <button
              className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-700 text-white"
              onClick={() => cancelBooking(b.id)}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
