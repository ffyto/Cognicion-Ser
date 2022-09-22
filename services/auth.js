const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function loginHandler(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/local/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function verifyAccount(verifyToken) {
  const response = await fetch(
    `${BASE_URL}/api/auth/local/activate-account/${verifyToken}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}
