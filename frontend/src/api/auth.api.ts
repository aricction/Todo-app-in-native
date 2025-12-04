export const BASE_URL = "https://backendandroid-production-7995.up.railway.app/auth/api";

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
