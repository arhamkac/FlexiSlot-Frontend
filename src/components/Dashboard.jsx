import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Total Bookings', value: 128, color: '#00f2fe' },
    { label: 'Active Users', value: 47, color: '#f97102' },
    { label: 'Available Slots Today', value: 36, color: '#00ff11' },
    { label: 'Cancelled Bookings', value: 5, color: '#ff00ff' },
  ];

  const navCards = [
    { label: 'Manage Bookings', path: '/bookingstatus', icon: '📅' },
    { label: 'Add Slot', path: '/booking', icon: '➕' },
    { label: 'User Queries', path: '/contact', icon: '❓' },
    { label: 'About Us', path: '/aboutus', icon: 'ℹ️' },
  ];

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <h1 className="text-[36px] font-bold text-center text-[#00f2fe] mb-10">
        Admin Dashboard
      </h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {metrics.map(({ label, value, color }, idx) => (
          <div
            key={idx}
            className="bg-[#111] p-6 rounded-2xl shadow-lg text-center border-2"
            style={{ borderColor: color }}
          >
            <h3 className="text-[20px] mb-2 text-[#b0bec5]">{label}</h3>
            <p
              className="text-[32px] font-bold"
              style={{ color: color }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Navigation Section */}
      <h2 className="text-[28px] text-[#f97102] mb-6 text-center">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {navCards.map(({ label, path, icon }, idx) => (
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
    </section>
  );
}
