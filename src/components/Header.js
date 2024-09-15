import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path as needed

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>
    </header>
  );
}

export default Header;