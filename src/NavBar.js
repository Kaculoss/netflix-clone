import React, { useEffect, useState } from "react";
import "./NavBar.css";

export const NavBar = () => {
  const [show, handleShow] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`navBar ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="/logo.png"
        alt="Netfix Logo"
      />
      <img
        className="nav__avatar"
        src="/logoAvatar.png"
        alt="Netfix Logo"
      />
    </div>
  );
};
