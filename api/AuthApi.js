// AuthApi.js
const getAuthToken = async (username, password) => {
  try {
    const response = await fetch('https://w1ofof2wuh.execute-api.eu-central-1.amazonaws.com/dev/getauthtoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Example: Show a pop-up
        alert('Deze gebruikersnaam en wachtwoord zijn niet geldig.');
      } else {
        // Handle other error responses
        throw new Error('Invalid credentials');
      }
    }

    const result = await response.json();
    return result.authtoken; // Assuming the token is present in the response JSON
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export default getAuthToken;
