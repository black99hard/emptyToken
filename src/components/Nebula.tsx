import React from 'react';

const Nebula: React.FC = () => {
  return (
    <div className="fixed inset-0 opacity-30">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent" style={{ transform: 'translate(30%, 20%)' }}></div>
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/15 via-transparent to-transparent" style={{ transform: 'translate(-20%, -30%)' }}></div>
    </div>
  );
};

export default Nebula;