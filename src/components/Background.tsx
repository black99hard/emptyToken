import React from 'react';
import Stars from './Stars';
import MatrixRain from './MatrixRain';
import Nebula from './Nebula';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <Nebula />
      <Stars />
      <MatrixRain />
    </div>
  );
};

export default Background;