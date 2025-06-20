export const fetchParkCoordinates = async (filters) => {
  const response = await fetch('http://127.0.0.1:8000/parks', {
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
  const response = await fetch('http://127.0.0.1:8000/geocode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });


  if (!response.ok) {
    throw new Error('Failed to address Coordinates');
  }
  return response.json();
};