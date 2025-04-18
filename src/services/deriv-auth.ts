
// Constants for Deriv OAuth
const DERIV_APP_ID = '71514'; // User's specific Deriv App ID
const DERIV_OAUTH_URL = 'https://oauth.deriv.com/oauth2/authorize';
const REDIRECT_URI = window.location.origin + '/auth/callback';
const DERIV_API_URL = 'wss://ws.binaryws.com/websockets/v3';

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
  
  // Fetch user account information after successful login
  fetchUserAccounts(token);
  
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
  localStorage.removeItem('deriv_accounts');
  localStorage.removeItem('deriv_user_info');
  // Any other cleanup needed
};

/**
 * Fetch user accounts information from Deriv API
 * @param token Deriv API token
 */
export const fetchUserAccounts = async (token: string) => {
  try {
    const socket = new WebSocket(DERIV_API_URL);
    
    socket.onopen = () => {
      // First authorize with the token
      socket.send(JSON.stringify({
        authorize: token
      }));
    };
    
    socket.onmessage = (msg) => {
      const response = JSON.parse(msg.data);
      
      // Handle authorization response
      if (response.msg_type === 'authorize') {
        if (response.error) {
          console.error('Authorization error:', response.error);
          return;
        }
        
        // Store user info
        localStorage.setItem('deriv_user_info', JSON.stringify(response.authorize));
        
        // Request account list
        socket.send(JSON.stringify({
          account_list: 1
        }));
      }
      
      // Handle account list response
      if (response.msg_type === 'account_list') {
        if (response.error) {
          console.error('Account list error:', response.error);
          return;
        }
        
        // Store accounts information
        localStorage.setItem('deriv_accounts', JSON.stringify(response.account_list));
        
        // Request balance for each account
        response.account_list.forEach((account: any) => {
          socket.send(JSON.stringify({
            balance: 1,
            account: account.loginid
          }));
        });
      }
      
      // Handle balance response
      if (response.msg_type === 'balance') {
        if (response.error) {
          console.error('Balance error:', response.error);
          return;
        }
        
        // Update account with balance information
        const accounts = JSON.parse(localStorage.getItem('deriv_accounts') || '[]');
        const updatedAccounts = accounts.map((account: any) => {
          if (account.loginid === response.balance.loginid) {
            return {
              ...account,
              balance: response.balance.balance,
              currency: response.balance.currency
            };
          }
          return account;
        });
        
        localStorage.setItem('deriv_accounts', JSON.stringify(updatedAccounts));
      }
      
      // Close connection after processing all responses
      if (response.msg_type === 'balance') {
        setTimeout(() => socket.close(), 1000);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
  } catch (error) {
    console.error('Error fetching user accounts:', error);
  }
};

/**
 * Get user's Deriv accounts with balances
 */
export const getDerivAccounts = () => {
  const accountsStr = localStorage.getItem('deriv_accounts');
  if (!accountsStr) return [];
  
  try {
    return JSON.parse(accountsStr);
  } catch (e) {
    console.error('Error parsing accounts data:', e);
    return [];
  }
};

/**
 * Get user's Deriv information
 */
export const getDerivUserInfo = () => {
  const userInfoStr = localStorage.getItem('deriv_user_info');
  if (!userInfoStr) return null;
  
  try {
    return JSON.parse(userInfoStr);
  } catch (e) {
    console.error('Error parsing user info:', e);
    return null;
  }
};
