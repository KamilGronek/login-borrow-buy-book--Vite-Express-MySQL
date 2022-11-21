import React from "react";
import "../styles/Header.css"

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src="logo192.png" alt=""/>
           <h1>React's library</h1>
      <hr className="header__hr" />
    </header>
  );
};

export default Header;
