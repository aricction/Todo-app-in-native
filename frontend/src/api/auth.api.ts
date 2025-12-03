const BASE_URL = "http://10.104.86.80:5000/auth/api";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  retypePassword: string
) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, retypePassword }),
  });
  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

