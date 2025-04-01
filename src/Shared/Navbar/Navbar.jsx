import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Image/logo.png";
import useAuth from "./../../Hooks/useAuth";
import toast from "react-hot-toast";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About Us", path: "/about" },
  { id: 3, name: "Events", path: "/events" },
  { id: 4, name: "Donate", path: "/donate" },
  { id: 5, name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logOut().then(()=>{
      toast.success('Signout successfull')
    }).catch((err)=>{
      toast.error(err.response.data)
    })
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-lg shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4 lg:px-16">
        {/* Logo Section */}
        <div className="flex items-center text-xl font-bold">
          <img className="w-8" src={logo} alt="" />
          <span className="text-primary font-serif">EOM</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`hover:text-primary transition ${
                location.pathname === item.path ? "text-primary font-bold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Login and User Dropdown */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          {user?.email ? (
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt=""
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-primary text-white px-4 py-1 rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white/80 backdrop-blur-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`text-lg hover:text-primary transition ${
                location.pathname === item.path ? "text-primary font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="md:hidden">
            {user?.email ? (
              <div className="flex flex-col gap-2 justify-center items-center">
                <img
                  className="w-16 h-16 rounded-lg cursor-pointer"
                  src={user?.photoURL}
                  alt=""
                />
                <div className="flex flex-col">
                  <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 py-1 rounded-md"
                  >
                    Logout
                  </button>
                  <Link
                    to="/dashboard"
                    className="text-lg hover:text-primary transition text-primary font-bold"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primary text-white px-4 py-1 rounded-md">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
