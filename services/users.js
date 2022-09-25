const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUserByEmail(email) {
  const response = await fetch(`${BASE_URL}/api/users/email/${email}`, {});
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.text();
}
