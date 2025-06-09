import React from "react";

const Profile = () => {
  const user = {
    firstName: "Albert",
    lastName: "Einstein",
    email: "electron@gmail.com",
    bookings: [
      { date: "2025-05-01", time: "10:00 AM", status: "Confirmed" },
      { date: "2025-04-30", time: "2:00 PM", status: "Cancelled" },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto border border-cyan-400 rounded-lg p-8 bg-[#0d0d0d] shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">User Profile</h1>
        <div className="space-y-3 mb-6 text-gray-300">
          <p><span className="text-cyan-300">First Name:</span> {user.firstName}</p>
          <p><span className="text-cyan-300">Last Name:</span> {user.lastName}</p>
          <p><span className="text-cyan-300">Email:</span> {user.email}</p>
        </div>

        <h2 className="text-2xl font-semibold text-orange-400 mb-3">Booking History</h2>
        <div className="space-y-4">
          {user.bookings.map((booking, index) => (
            <div
              key={index}
              className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-md"
            >
              <p><span className="text-cyan-300">Date:</span> {booking.date}</p>
              <p><span className="text-cyan-300">Time:</span> {booking.time}</p>
              <p>
                <span className="text-cyan-300">Status:</span>{" "}
                <span
                  className={
                    booking.status === "Confirmed"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {booking.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
 