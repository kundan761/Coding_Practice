import React from 'react';

const Greeting = ({ name, timeOfDay }) => {
  return (
    <h2>
      {`Good ${timeOfDay}, ${name}!`}
    </h2>
  );
};

export default Greeting;
