const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createAppointment(appointment) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments`, {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.text();
}

export async function getAllUserAppointments() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments/user`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function getSingleAppointment(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function getAllProfessionalAppointments() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments/professional`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function updateAppointment(id, appointmentUpdate) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(appointmentUpdate),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function findAppointmentByPaymentAndUpdate(
  paymentId,
  appointmentUpdate
) {
  console.log('🚀 ~ file: appointments.js ~ line 57 ~ paymentId', paymentId);
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/appointments/${paymentId}`, {
    method: 'PUT',
    body: JSON.stringify(appointmentUpdate),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
