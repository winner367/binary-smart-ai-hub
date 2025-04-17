
// Constants for Deriv OAuth
const DERIV_APP_ID = '1234'; // Replace with your actual Deriv App ID after registering
const DERIV_OAUTH_URL = 'https://oauth.deriv.com/oauth2/authorize';
const REDIRECT_URI = window.location.origin + '/auth/callback';

// List of scopes we want to request from the user
const SCOPES = [
  'read',
  'trade',
  'trading_information',
];

/**
 * Redirects the user to Deriv OAuth login page
 */
export const redirectToDerivLogin = () => {
  const url = new URL(DERIV_OAUTH_URL);
  
  // Add the required OAuth parameters
  url.searchParams.append('app_id', DERIV_APP_ID);
  url.searchParams.append('l', 'EN');
  url.searchParams.append('brand', 'deriv');
  url.searchParams.append('redirect_uri', REDIRECT_URI);
  url.searchParams.append('scope', SCOPES.join(' '));
  
  // Redirect to Deriv OAuth page
  window.location.href = url.toString();
};

/**
 * Process the OAuth token received from Deriv
 * @param token The access token received from the OAuth flow
 */
export const processDerivToken = (token: string) => {
  // Store the token in localStorage for future API calls
  localStorage.setItem('deriv_token', token);
  
  // You can also store additional user information or validate the token here
  
  return {
    isAuthenticated: true,
    token
  };
};

/**
 * Check if the user is authenticated with Deriv
 */
export const isDerivAuthenticated = (): boolean => {
  return !!localStorage.getItem('deriv_token');
};

/**
 * Logout from Deriv by removing the stored token
 */
export const logoutDeriv = () => {
  localStorage.removeItem('deriv_token');
  // Any other cleanup needed
};
