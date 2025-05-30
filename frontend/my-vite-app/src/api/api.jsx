
export const fetchParkCoordinates = async () => {
  const response = await fetch('http://127.0.0.1:5000/parks/coordinates');
  if (!response.ok) {
    throw new Error('Failed to fetch park coordinates');
  }
  return response.json();
};
