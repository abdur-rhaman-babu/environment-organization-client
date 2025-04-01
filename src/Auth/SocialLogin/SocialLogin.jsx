import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../api/utils";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const hangleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result)  => {
        await saveUser({...result?.user, role:'donor'})
        toast.success("SignIn Successfull");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <button
        onClick={hangleGoogleLogin}
        className="mt-2 w-full flex items-center justify-center gap-5 border py-2 rounded-lg hover:bg-gray-200 transition"
      >
        <FaGoogle />
        <p>Continue with Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
