const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createPayment(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/api/pagos/${id}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
