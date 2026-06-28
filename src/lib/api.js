const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDoctors = async () => {
  const res = await fetch(`${API_URL}/docter`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch doctors');
  }

  return res.json();
};

export const getJwtToken = async (email) => {
  const res = await fetch(`${API_URL}/jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate token');
  }

  const data = await res.json();

  localStorage.setItem('access-token', data.token);

  return data.token;
};

export const createAppointment = async (appointmentData, token) => {
  const res = await fetch(`${API_URL}/api/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  return res.json();
};

export const getAppointments = async (token) => {
  const res = await fetch(`${API_URL}/api/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const updateAppointment = async (id, appointmentData, token) => {
  const res = await fetch(`${API_URL}/api/appointments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  return res.json();
};

export const deleteAppointment = async (id, token) => {
  const res = await fetch(`${API_URL}/api/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};