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

export async function getSigleAppointment(id) {
  const response = await fetch(`${BASE_URL}/api/appointments/${id}`);
  return response.json();
}
