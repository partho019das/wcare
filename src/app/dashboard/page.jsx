// /src/app/dashboard/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
  getJwtToken,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from '@/lib/api';

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [activeTab, setActiveTab] = useState('bookings');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [profileModal, setProfileModal] = useState(false);

  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const loadBookings = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        const token = await getJwtToken(session.user.email);
        localStorage.setItem('access-token', token);

        const data = await getAppointments(token);
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      setProfileName(session.user.name || '');
      setProfileImage(session.user.image || '');
    }
  }, [session]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this appointment?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('access-token');
      await deleteAppointment(id, token);

      setAppointments((prev) => prev.filter((item) => item._id !== id));
      alert('Appointment deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete appointment');
    }
  };

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access-token');

      const form = e.target;
      const updatedData = {
        patientName: form.patientName.value,
        phone: form.phone.value,
        gender: form.gender.value,
        date: form.date.value,
        timeSlot: form.timeSlot.value,
        problem: form.problem.value,
      };

      await updateAppointment(selectedBooking._id, updatedData, token);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === selectedBooking._id
            ? { ...item, ...updatedData }
            : item
        )
      );

      setSelectedBooking(null);
      alert('Appointment updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update appointment');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const { error } = await authClient.user.update({
        name: profileName,
        image: profileImage,
      });

      if (error) {
        alert(error.message || 'Failed to update profile');
        return;
      }

      setProfileModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  if (isPending || loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  if (!session) return null;

  return (
<section className="min-h-screen bg-slate-100 p-6 text-gray-900">
  <div className="max-w-6xl mx-auto">
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setActiveTab('bookings')}
        className={`px-5 py-2.5 rounded-lg font-semibold transition ${
          activeTab === 'bookings'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        My Bookings
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`px-5 py-2.5 rounded-lg font-semibold transition ${
          activeTab === 'profile'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        My Profile
      </button>
    </div>

    {activeTab === 'profile' && (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-2xl">
        <img
          src={session.user.image || 'https://via.placeholder.com/120'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />

        <h2 className="text-3xl font-bold text-gray-900 mt-5">
          {session.user.name || 'Unknown User'}
        </h2>

        <p className="text-lg text-gray-600 mt-2">
          {session.user.email}
        </p>

        <button
          onClick={() => setProfileModal(true)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Update Profile
        </button>
      </div>
    )}

    {activeTab === 'bookings' && (
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          My Bookings
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-600">
            No appointments found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {appointments.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 text-gray-900"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {item.doctorInfo?.name || 'Doctor'}
                </h3>

                <p className="text-blue-600 font-medium mb-4">
                  {item.doctorInfo?.specialty}
                </p>

                <p className="text-gray-750">
                  <span className="font-semibold">Patient:</span> {item.patientName}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {item.email}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {item.phone}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Date:</span> {item.date}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span> {item.timeSlot}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Problem:</span> {item.problem}
                </p>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setSelectedBooking(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
</section>
  );
};

export default DashboardPage;