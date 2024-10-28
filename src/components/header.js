import React, { useState, useEffect, useCallback } from "react";
import "../css/header.css";  // Import CSS for the header
import logo from '../images/1.png';

const Header = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setIsScrollingUp(currentScrollPos < lastScrollPos); // Scrolling up
    setLastScrollPos(currentScrollPos);
  }, [lastScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, [handleScroll]); // Only include handleScroll as a dependency

  return (
    <header className={`app-header ${isScrollingUp ? "visible" : "hidden"}`}>
      <img src={logo} alt="App Logo" className="logo" />
      <h2>
        <span className="national">NATIONAL</span>
        <span className="achievement">ACHIEVEMENT</span>
        <span className="test">TEST</span>
      </h2>
    </header>
  );
};

export default Header;
