const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createNonAvailableHour(user) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/nonAvailableHours`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.text();
}

export async function getAllNonAvailableHours() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/nonAvailableHours`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
