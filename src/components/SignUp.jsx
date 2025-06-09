import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-[#111] border border-[#00f2fe] rounded-lg p-8 space-y-6">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-[#00f2fe]">
          Flexi<span className="text-[#f97102]">Slot</span>
        </h1>
        <p className="text-center text-[#b0bec5]">Make the most of your life</p>

        {/* Form */}
        <form className="space-y-5">
          {[
            { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name' },
            { id: 'lastName',  label: 'Last Name',  type: 'text', placeholder: 'Enter last name' },
            { id: 'email',     label: 'Email',      type: 'email', placeholder: 'Enter email' },
            { id: 'password',  label: 'Password',   type: 'password', placeholder: '6+ characters' },
            { id: 'confirm',   label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-[#00f2fe] mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                required
                minLength={type === 'password' ? 6 : undefined}
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
              />
            </div>
          ))}

          <p className="text-center text-xs text-[#b0bec5]">
            By clicking “Agree & Join,” you agree to our{' '}
            <Link to="/useragreement" className="text-[#00f2fe] hover:underline">
              User Agreement
            </Link>
            ,{' '}
            <Link to="/privacy" className="text-[#00f2fe] hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/cookies" className="text-[#00f2fe] hover:underline">
              Cookie Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#00ff11] transition"
          >
            Agree & Join
          </button>

          <p className="text-center text-sm text-[#b0bec5]">
            Already on FlexiSlot?{' '}
            <Link to="/login" className="text-[#00f2fe] hover:underline">
              Log In
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-[#555] mt-4">
          © 2019 FlexiSlot Corporation
        </p>
      </div>
    </div>
  );
}
