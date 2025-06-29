import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year.slice(2)}`;
};

const BookingStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`/api/bookings/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error('Error fetching bookings:', err));
    }
  }, [user]);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      await axios.delete(`/api/bookings/cancel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert('Booking cancelled successfully.');
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      <header className="bg-[#111] text-[#00f2fe] text-center py-6">
        <h1 className="text-3xl font-bold">Your Bookings</h1>
      </header>

      <div className="flex-grow flex flex-col items-center px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          HOME
        </button>

        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings found.</p>
        ) : (
          <div className="space-y-6 w-full max-w-xl">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#00f2fe]"
              >
                <h2 className="text-xl font-semibold text-[#00f2fe] mb-2">Booking ID #{booking.id}</h2>
                <p><strong>Name:</strong> {booking.user.name}</p>
                <p><strong>Email:</strong> {booking.user.email}</p>
                <p><strong>Room:</strong> {booking.slot.slotType.room.name}</p>
                <p><strong>Category:</strong> {booking.slot.slotType.category}</p>
                <p><strong>Date:</strong> {formatDate(booking.slot.slotType.date)}</p>
                <p><strong>Time:</strong> {booking.slot.slotType.startTime} - {booking.slot.slotType.endTime}</p>
                <p><strong>Purpose:</strong> {booking.purpose}</p>
                <p><strong>Status:</strong> <span className="text-green-400">Confirmed</span></p>

                <button
                  onClick={() => handleCancel(booking.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-[#111] text-center text-sm text-gray-400 py-4">
        &copy; 2024 FlexiSlot
      </footer>
    </div>
  );
};

export default BookingStatus;
