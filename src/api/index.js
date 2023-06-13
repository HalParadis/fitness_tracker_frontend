const BASE_URL = 'https://fitness-tracker-zlky.onrender.com/';

export const fetchFromAPI = async (
  {body, endpoint, method, token}) => {
  try {
    const response = await fetch(
      BASE_URL + endpoint, {
        method: method ? method.toUpperCase() : 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && {'Authorization': `Bearer ${token}`})
        },
        ...(body && {body: JSON.stringify(body)})
      }
    );
    const result = await response.json();
    return result;
  }
  catch(err) {
    console.error(err);
  }
}