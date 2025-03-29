import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Image/logo.png";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About Us", path: "/about" },
  { id: 3, name: "Events", path: "/events" },
  { id: 4, name: "Donate", path: "/donate" },
  { id: 5, name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

        {/* Login Button */}
        <div className="hidden md:block">
          <button className="bg-primary text-white px-4 py-1 rounded-md">
            Login
          </button>
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
          <button className="bg-primary text-white px-4 py-1 rounded-md">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
