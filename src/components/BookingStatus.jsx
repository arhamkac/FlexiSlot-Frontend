import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BookingStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state;

  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel your booking?');
    if (confirmCancel) {
      alert('Your booking has been canceled.');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col justify-between">
      <header className="bg-[#111] text-[#00f2fe] text-center py-6">
        <h1 className="text-3xl font-bold">Booking Confirmation</h1>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center px-4 mt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          HOME
        </button>

        <main className="bg-[#1a1a1a] max-w-md w-full rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-[#00f2fe]">
            Booking Details
          </h2>

          <div className="space-y-3 text-sm text-gray-200">
            <p><strong>Name:</strong> {bookingData?.userName || 'N/A'}</p>
            <p><strong>Email:</strong> {bookingData?.email || 'N/A'}</p>
            <p><strong>Classroom:</strong> {bookingData?.room || 'N/A'}</p>
            <p><strong>Date:</strong> {bookingData?.date || 'N/A'}</p>
            <p><strong>Time Slot:</strong> {bookingData?.timeSlot || 'N/A'}</p>
            <p><strong>Status:</strong> <span className="text-green-400">Confirmed</span></p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Cancel My Slot
            </button>
          </div>
        </main>
      </div>

      <footer className="bg-[#111] text-center text-sm text-gray-400 py-4">
        &copy; 2024 FlexiSlot
      </footer>
    </div>
  );
};

export default BookingStatus;
