const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API base URL is:", BASE_URL);

export const fetchParkCoordinates = async (filters) => {
  const response = await fetch(`${BASE_URL}/parks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch park coordinates');
  }
  return response.json();
};

export const fetchAddressCoordinates = async (filters) => {
  const response = await fetch(`${BASE_URL}/geocode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Failed to address Coordinates');
  }
  return response.json();
};