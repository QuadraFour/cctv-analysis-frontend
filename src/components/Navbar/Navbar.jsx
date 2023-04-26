import "./Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //if user clicks outside the navbar close it
  useEffect(() => {
    const closeNavbar = (e) => {
      if (e.srcElement.className !== "fa-solid fa-bars") {
        setShowSidebar(false);
      }
    };
    document.body.addEventListener("click", closeNavbar);
    return () => {
      document.body.removeEventListener("click", closeNavbar);
    };
  }, []);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className="navbar-wrapper">
      <div className="logo">
        <h4 className="title">Kavach23</h4>
      </div>
      <div>
        {toggleMenu || screenWidth > 860 ? (
          <ul className="nav-elements">
            <li>
              <a href="#info" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#schedule" className="nav-link">
                Predict
              </a>
            </li>
          </ul>
        ) : (
          <div className="sidebar-toggle">
            {showSidebar ? (
              <div></div>
            ) : (
              <i className="fa-solid fa-bars" onClick={toggleSidebar}></i>
            )}
          </div>
        )}
      </div>
      <div className={`${showSidebar ? "mobile-nav__wrapper" : "hide"}`}>
        <div className={`sidebar ${showSidebar ? "sidebar-open" : ""}`}>
          <div className="sidebar-header">
            {showSidebar && (
              <i
                className="fa-solid fa-times fa-lg"
                onClick={toggleSidebar}
              ></i>
            )}
          </div>
          <ul className="sidebar-nav-elements">
            <li>
              <a href="#info" className="nav-link" onClick={toggleSidebar}>
                Home
              </a>
            </li>
            <li>
              <a href="#schedule" className="nav-link" onClick={toggleSidebar}>
                Predict
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
