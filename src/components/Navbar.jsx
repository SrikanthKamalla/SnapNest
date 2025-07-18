import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { userLogout } from "../service/auth";
import { toast } from "react-toastify";
import "../styles/navbar.css";
import { getAuthToken } from "../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../toolkit/userSlice";
import logo from "../assets/Adobe Express - file.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { label: "Home", path: "/" },
    { label: "Create Post", path: "/create-post" },
    { label: "My Posts", path: "/my-posts" },
    { label: "Profile", path: "/user-profile" },
  ];
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = getAuthToken();

    if (!token || !user) {
      toast.error("Something went wrong!!");
      return;
    }

    try {
      const response = await userLogout();
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        return;
      }

      toast.success(response?.data?.message);
      dispatch(setUser(null));
      navigate("/login", { replace: true });
      localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <img src={logo} alt="logo" className="logo" />
            <NavLink to="/" className="brand-link">
              SnapNest
            </NavLink>
          </div>

          <div className="nav-left desktop-nav">
            {navbarItems.map((nav) => (
              <NavLink
                key={nav.path}
                to={nav.path}
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                {nav.label}
              </NavLink>
            ))}
          </div>

          {user && (
            <div className="nav-right desktop-nav">
              <div className="user-info">
                <span className="username">Hi, {user?.name}</span>
              </div>
              <div className="logout-container">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="mobile-menu-btn">
            <button onClick={toggleMenu} className="menu-toggle-btn">
              {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <button onClick={closeMenu} className="close-btn">
              <IoClose size={28} />
            </button>
          </div>

          {user && (
            <div className="mobile-user-info">
              <span className="mobile-username">Hi, {user?.name}</span>
            </div>
          )}

          <div className="mobile-nav-items">
            {navbarItems.map((nav) => (
              <NavLink
                key={nav.path}
                to={nav.path}
                className={({ isActive }) =>
                  isActive ? "mobile-nav-item active" : "mobile-nav-item"
                }
                onClick={closeMenu}
              >
                {nav.label}
              </NavLink>
            ))}

            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="mobile-logout-btn"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
