import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { uploadImage } from "../../api/utils";
import toast from "react-hot-toast";
import useAuth from './../../Hooks/useAuth';


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {createUser, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const image_url = await uploadImage(image)

    const formData = {
      name,
      email,
      role,
      password,
      image_url
    };
    console.log(formData)
    try {
      //2. User Registration
      const result = await createUser(email, password);

      //3. Save username & profile photo
      await updateUserProfile(name, image_url);
      console.log(result);

      // await saveUser({...result?.user, displayName: name, photoURL: image_url})
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center md:min-h-screen mt-4 bg-gray-100 px-3">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-text">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="mb-2">
            <label className="block text-text">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-2">
            <label className="block text-text">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-2">
            <label className="block text-text">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-text">Upload Image</label>
            <input
              type="file"
              name="image"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-2 relative col-span-2">
            <label className="block text-text">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
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

          <div className="mb-2 col-span-2">
            <button
              type="submit"
              className="w-full bg-primary text-white hover:bg-hover py-2 rounded-lg transition"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Or register with</p>
          <button className="mt-2 w-full flex items-center gap-4 justify-center border py-2 rounded-lg hover:bg-gray-200 transition">
            <FaGoogle />
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
