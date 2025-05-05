import React from 'react';

const LoginMessage = ({ isLoggedIn }) => {
  return (
    <p>
      {isLoggedIn ? 'Welcome back, User!' : 'Please log in.'}
    </p>
  );
};

export default LoginMessage;
