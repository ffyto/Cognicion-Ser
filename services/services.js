const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getSingleService(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/services/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function getAllServices() {
  const response = await fetch(`${BASE_URL}/api/services`, {
    method: 'GET',
  });
  return response.json();
}

export async function createService(appointment) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/services`, {
    method: 'POST',
    body: JSON.stringify(appointment),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.text();
}

export async function updateService(id, appointmentUpdate) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(appointmentUpdate),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function deleteService(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/services/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
