import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("donor");
  
  return (
    <div className="flex items-center justify-center md:min-h-screen mt-4 bg-gray-100 px-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text">Register</h2>
        
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-text">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-text">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-text">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          
          <div className="mb-4 relative">
            <label className="block text-text">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="button" 
              className="absolute right-3 top-9 text-gray-500" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary text-white hover:bg-hover py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">Or register with</p>
          <button 
            className="mt-2 w-full flex items-center gap-4 justify-center border py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <FaGoogle/>
            Continue with Google
          </button>
        </div>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-primary font-semibold hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
}
