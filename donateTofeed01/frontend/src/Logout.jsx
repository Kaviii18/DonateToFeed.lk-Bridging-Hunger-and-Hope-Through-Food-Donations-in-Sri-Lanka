// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // This function will be called once when the component mounts

    // 1. Implement your actual logout logic here
    //    This is where you'd clear user tokens, session data, etc.
    //    For example, if you store a JWT in localStorage:
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData'); // Clear any other user-related data

    // If you're using a state management system (like Context API or Redux):
    // You'd dispatch an action to clear the user's logged-in state.
    // e.g., if you had a context:
    // SomeAuthContext.logout();

    console.log('User logged out successfully!');

    // 2. Redirect the user after logout
    //    You can redirect to the home page, login page, or any public route.
    const redirectTimeout = setTimeout(() => {
      navigate('/signin'); // Or '/home', '/' depending on your app's flow
    }, 1000); // Redirect after 1 second to give time for console log or a brief message

    // Cleanup function: important for preventing memory leaks
    return () => clearTimeout(redirectTimeout);
  }, [navigate]); // Add navigate to dependency array

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh', // Take up most of the viewport height
      fontSize: '1.5rem',
      color: '#333'
    }}>
      <p>Logging out...</p>
    </div>
  );
}