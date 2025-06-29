import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year.slice(2)}`;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get('/api/slots/available')
      .then((res) => setSlots(res.data))
      .catch((err) => console.error('Error fetching slots', err));
  }, []);

  const getAvailableDates = () => {
    const uniqueDates = [...new Set(slots.map((slot) => slot.slotType.date))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  };

  const getAvailableCategories = () => {
    return [
      ...new Set(
        slots
          .filter((slot) => slot.slotType.date === selectedDate)
          .map((slot) => slot.slotType.category)
      ),
    ];
  };

  const getAvailableTimes = () => {
    return [
      ...new Set(
        slots
          .filter(
            (slot) =>
              slot.slotType.date === selectedDate &&
              slot.slotType.category === selectedCategory
          )
          .map((slot) => `${slot.slotType.startTime}-${slot.slotType.endTime}`)
      ),
    ];
  };

  const getAvailableRooms = () => {
    return [
      ...new Set(
        slots
          .filter(
            (slot) =>
              slot.slotType.date === selectedDate &&
              slot.slotType.category === selectedCategory &&
              `${slot.slotType.startTime}-${slot.slotType.endTime}` === selectedTime
          )
          .map((slot) => slot.slotType.room.name)
      ),
    ];
  };

  const getSelectedSlotId = () => {
    const slot = slots.find(
      (slot) =>
        slot.slotType.date === selectedDate &&
        slot.slotType.category === selectedCategory &&
        `${slot.slotType.startTime}-${slot.slotType.endTime}` === selectedTime &&
        slot.slotType.room.name === selectedRoom
    );
    return slot?.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slotId = getSelectedSlotId();
    if (!slotId || !purpose) {
      alert('Please complete all fields.');
      return;
    }

    if (!window.confirm('Are you sure you want to book this slot?')) return;

    try {
      const res = await axios.post(`/api/bookings/book`, null, {
        params: {
          userId: user?.id,
          slotId,
          purpose,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const booking = res.data;

      // Transform the backend response into frontend-friendly format
      const bookingDetails = {
        userName: booking.user.name,
        email: booking.user.email,
        room: booking.slot.slotType.room.name,
        date: booking.slot.slotType.date,
        timeSlot: `${booking.slot.slotType.startTime}-${booking.slot.slotType.endTime}`,
        purpose: booking.purpose,
      };

      setShowConfirmation(true);
      setTimeout(() => navigate('/bookingstatus', { state: bookingDetails }), 1200);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Something went wrong while booking.');
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#111] border border-[#00f2fe] rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#00f2fe]">Book a Slot</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="text-[#00f2fe] text-sm">Date</label>
            <select
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedCategory('');
                setSelectedTime('');
                setSelectedRoom('');
              }}
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            >
              <option value="">Select a date</option>
              {getAvailableDates().map((date, idx) => (
                <option key={idx} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          {selectedDate && (
            <div>
              <label className="text-[#00f2fe] text-sm">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedTime('');
                  setSelectedRoom('');
                }}
                className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
                required
              >
                <option value="">Select category</option>
                {getAvailableCategories().map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time Slot */}
          {selectedCategory && (
            <div>
              <label className="text-[#00f2fe] text-sm">Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedRoom('');
                }}
                className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
                required
              >
                <option value="">Select time slot</option>
                {getAvailableTimes().map((time, idx) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Room */}
          {selectedTime && (
            <div>
              <label className="text-[#00f2fe] text-sm">Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
                required
              >
                <option value="">Select room</option>
                {getAvailableRooms().map((room, idx) => (
                  <option key={idx} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Purpose */}
          <div>
            <label className="text-[#00f2fe] text-sm">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose of booking"
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00f2fe] hover:bg-[#00ff11] text-black font-semibold rounded-md transition duration-200"
          >
            Book Now
          </button>
        </form>

        {showConfirmation && (
          <div className="text-center text-[#00ff11] font-semibold pt-4">🎉 Booking Confirmed!</div>
        )}
      </div>
    </div>
  );
}
