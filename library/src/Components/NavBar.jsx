import React, { useEffect, useState } from 'react';
import '../CSS/Navbr.css'
import Kalvium_Logo from '../assets/Kalvium-Logo-SVG.svg'
import instruction from '../assets/Ins.png'
import search from '../assets/search.png'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SearchInput = styled.input`
  margin: ${({ isFocused }) => (isFocused ? '10px' : '10px 10px')};
  padding: 12px 8px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 4px;
  width: ${({ isFocused }) => (isFocused ? '40vw' : '45vw')};
  outline: none;
  background: url(${search}) no-repeat 10px center;
  background-size: 20px 20px;
  padding-left: 40px;
  position: relative;

  &::before {
    content: url(${search});
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  transform-origin: left center;
  transform: scale(1);
  transition: all 0.3s ease-in-out;

  &:focus {
    width: 40vw;
  }
`;

const Navbar = ({ onSearch, userName }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (userName) {
      // Handle sign-out logic here
      // For now, let's just navigate back to the main page
      navigate('/');
    } else {
      // Handle register logic here
      navigate('/register');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setIsFocused(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src={Kalvium_Logo} alt="Logo" /></div>
      {/* <input
        type="text"
        placeholder="Search books"
        // Add your search functionality here
      /> */}
    
      <SearchInput
        type="text"
        placeholder="Search books"
        isFocused={isFocused}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {userName ? (
        <div className="navbar-right">
          <div className="user-welcome">Welcome, {userName}!</div>
        </div>
      ) : (
        <div className="navbar-right">
          <button className="register-btn" onClick={handleRegisterClick}>
            {userName ? 'Sign Out' : 'Register'}
          </button>
          <img src={instruction} alt="Instruction" className="hoverable-image" />
          <div className="hover-message">Register for a better experience</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
