import React from 'react';
import Avatar from './Avatar.jsx';
import UserInfo from './UserInfo.jsx';

const UserProfile = ({ name, email, bio, imageUrl }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <Avatar imageUrl={imageUrl} altText={`${name}'s avatar`} />
      <UserInfo name={name} email={email} bio={bio} />
    </div>
  );
};

export default UserProfile;
