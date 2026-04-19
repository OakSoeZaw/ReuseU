const BASE_URL = `${import.meta.env.VITE_API_URL}/api/items`;

export async function getAvailableItems() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch available items");
  }

  return response.json();
}

export async function getAllItems() {
  const response = await fetch(`${BASE_URL}/all`);

  if (!response.ok) {
    throw new Error("Failed to fetch all items");
  }

  return response.json();
}

export async function createItem(title, description, postedById, imageFile) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("postedById", postedById);
  formData.append("image", imageFile);

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create item");
  }

  return response.json();
}

export async function claimItem(itemId, claimedById) {
  const response = await fetch(`${BASE_URL}/${itemId}/claim`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ claimedById }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to claim item");
  }

  return response.json();
}

export async function confirmPickup(itemId) {
  const response = await fetch(`${BASE_URL}/${itemId}/confirm`, {
    method: "PUT",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to confirm pickup");
  }

  return response.json();
}

export async function deleteItem(itemId, postedById) {
  const response = await fetch(`${BASE_URL}/${itemId}?postedById=${postedById}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete item");
  }

  return response.text();
}

export async function getClaimedItems(userId) {
  const response = await fetch(`${BASE_URL}/claimed/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch claimed items");
  return response.json();
}