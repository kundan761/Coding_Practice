import React from 'react';
import UserProfile from './UserProfile';

const UserDashboard = ({ name, email, bio, imageUrl, isLoggedIn }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
      <h2>User Dashboard</h2>

      {isLoggedIn ? (
        <div>
          <UserProfile
            name={name}
            email={email}
            bio={bio}
            imageUrl={imageUrl}
          />
          <button style={{ marginTop: '10px' }}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You need to log in.</p>
          <button>Login</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
