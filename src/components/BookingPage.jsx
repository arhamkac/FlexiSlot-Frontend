import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    date: '',
    cat: '',
    timeSlot: '',
    room: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, email, date, cat, timeSlot, room } = formData;
  
    if (!userName || !email || !date || !cat || !timeSlot || !room) {
      alert('Please fill out all fields before booking.');
      return;
    }
  
    if (window.confirm('Are you sure you want to book this slot?')) {
      setShowConfirmation(true);
      setTimeout(() => navigate('/bookingstatus', { state: formData }), 1000);
    }
  };
  

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-[#00f2fe] rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#00f2fe]">
          Book Your Slot
        </h1>
        <p className="text-center text-[#b0bec5]">
          Pick date, category, time & room
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: 'userName', label: 'Name', type: 'text', name: 'userName' },
            { id: 'email', label: 'Email', type: 'email', name: 'email' },
            { id: 'date', label: 'Date', type: 'date', name: 'date' },
          ].map(({ id, label, type, name }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-[#00f2fe] mb-1">
                {label}
              </label>
              <input
                id={id}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded
                           focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
                required
              />
            </div>
          ))}

          <div>
            <label htmlFor="cat" className="block text-sm text-[#00f2fe] mb-1">
              Category
            </label>
            <select
              id="cat"
              name="cat"
              value={formData.cat}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option>Library</option>
              <option>Classroom</option>
              <option>Parking lot</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeSlot" className="block text-sm text-[#00f2fe] mb-1">
              Time Slot
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
              required
            >
              <option value="" disabled>
                Select a time slot
              </option>
              <option>8:00 AM - 10:00 AM</option>
              <option>10:00 AM - 12:00 PM</option>
              <option>1:00 PM - 3:00 PM</option>
              <option>3:00 PM - 5:00 PM</option>
            </select>
          </div>

          <div>
            <label htmlFor="room" className="block text-sm text-[#00f2fe] mb-1">
              Room
            </label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded
                         focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
              required
            >
              <option value="" disabled>
                Select a room
              </option>
              <option>Room A</option>
              <option>Room B</option>
              <option>Room C</option>
              <option>Room D</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg
                       hover:bg-[#00ff11] transition"
          >
            Book Now
          </button>
        </form>

        {showConfirmation && (
          <div className="text-center pt-4">
            <p className="text-[#00ff11] font-semibold">Booking Confirmed!</p>
          </div>
        )}
      </div>
    </div>
  );
}
