import { useState, useEffect } from 'react';

const RestaurantFooter = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.body.classList.toggle('dark', storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  return (
    <footer className={`footer-wrapper ${darkMode ? 'dark' : ''}`}>
      <button onClick={toggleDarkMode} className="dark-mode-btn">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <p>All rights reserved by BSIT-21</p>
    </footer>
  );
};

export default RestaurantFooter;
