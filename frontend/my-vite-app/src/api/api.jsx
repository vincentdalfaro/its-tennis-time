export const fetchParkCoordinates = async (filters) => {
  const response = await fetch('http://127.0.0.1:5000/parks/coordinates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch park coordinates');
  }
  return response.json();
};