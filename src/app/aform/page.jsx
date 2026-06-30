'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { createAppointment, getJwtToken } from '@/lib/api';

const FormComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docIdFromUrl = searchParams.get('docId') ? String(searchParams.get('docId')) : '';

  const { data: session, isPending } = authClient.useSession();

  const [doctors, setDoctors] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
    fetch(`${baseUrl}/docter`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setDoctors(list);
        if (docIdFromUrl) {
          const match = list.find((d) => String(d._id) === docIdFromUrl || String(d.id) === docIdFromUrl);
          if (match) {
            setSelectedDocId(String(match._id || match.id));
          }
        }
      })
      .catch((err) => console.error('Error fetching doctors:', err));
  }, [docIdFromUrl]);

  useEffect(() => {
    if (docIdFromUrl && doctors.length > 0) {
      const match = doctors.find((d) => String(d._id) === docIdFromUrl || String(d.id) === docIdFromUrl);
      if (match) {
        setSelectedDocId(String(match._id || match.id));
      }
    }
  }, [docIdFromUrl, doctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const doctorId = formData.get('doctorId');
    const selectedDoctor = doctors.find((d) => String(d._id) === String(doctorId) || String(d.id) === String(doctorId));

    const appointmentPayload = {
      patientName: formData.get('patientName'),
      phone: formData.get('phone'),
      email: session.user.email,
      date: formData.get('date'),
      timeSlot: formData.get('timeSlot'),
      gender: formData.get('gender'),
      problem: formData.get('problem'),
      doctorInfo: selectedDoctor
        ? {
            id: selectedDoctor._id || selectedDoctor.id,
            name: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            image: selectedDoctor.image,
          }
        : null,
    };

    try {
      const token = await getJwtToken(session.user.email);

      await createAppointment(appointmentPayload, token);

      alert('Appointment booked successfully!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Submission error!');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="text-center text-sm text-gray-500">Checking login...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selected Specialist Doctor
        </label>
        <select
          name="doctorId"
          value={selectedDocId}
          onChange={(e) => setSelectedDocId(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 font-medium text-sm shadow-sm"
        >
          <option value="">-- Choose a Doctor --</option>
          {doctors.map((doc) => {
            const idKey = doc._id || doc.id;
            return (
              <option key={String(idKey)} value={String(idKey)}>
                {doc.name} ({doc.specialty})
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Patient Full Name
        </label>
        <input
          type="text"
          name="patientName"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm shadow-sm"
          placeholder="e.g. John Doe"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm shadow-sm"
            placeholder="017XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={session?.user?.email || ''}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time Slot
          </label>
          <select
            name="timeSlot"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm shadow-sm"
          >
            <option value="Morning (09:00 AM - 12:00 PM)">
              Morning (09:00 AM - 12:00 PM)
            </option>
            <option value="Evening (04:00 PM - 07:00 PM)">
              Evening (04:00 PM - 07:00 PM)
            </option>
            <option value="Night (07:00 PM - 09:00 PM)">
              Night (07:00 PM - 09:00 PM)
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Gender
        </label>
        <div className="flex gap-6 mt-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <input type="radio" name="gender" value="Male" defaultChecked />
            <span>Male</span>
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <input type="radio" name="gender" value="Female" />
            <span>Female</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Brief Symptoms Description
        </label>
        <textarea
          name="problem"
          rows="4"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm resize-none shadow-sm"
          placeholder="Briefly describe your health issues..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl text-sm shadow-md"
      >
        {loading ? 'Processing Sync...' : 'Confirm Serial Booking'}
      </button>
    </form>
  );
};

const AppointmentFormPage = () => {
  return (
    <section className="min-h-screen bg-gray-50/50 py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Book Medical Appointment
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Please fill in the patient details accurately.
          </p>

          <Suspense fallback={<div className="text-center text-sm text-gray-500">Loading form...</div>}>
            <FormComponent />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default AppointmentFormPage;