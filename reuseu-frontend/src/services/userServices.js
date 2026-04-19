const BASE_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export async function getUserById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export async function getLeaderboard() {
  const response = await fetch(`${BASE_URL}/leaderboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }

  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}