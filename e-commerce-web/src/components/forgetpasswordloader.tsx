"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';


const LoadingSpinner = () => (
  <div
    style={{
      width: '50px',
      height: '50px',
      border: '8px solid #f3f3f3', // Light gray
      borderTop: '8px solid #3498db', // Blue
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  />
);

// Add keyframes directly in the component
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const App = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='mx-auto'>
      <style>{styles}</style>
      {loading && <LoadingSpinner />} {/* Show spinner while loading */}
    </div>

  );
};

export default App;
