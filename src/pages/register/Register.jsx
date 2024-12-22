import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";


const Register = () => {
    const { createUser, googleSignIn, updateUserProfile, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("One Uppercase letter required");
      toast.error("One uppercase letter required");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("One lowercase letter required");
      toast.error("One lowercase letter required");
      return;
    }
    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo).then(() => {
          setUser(result.user);
          navigate("/");
          toast.success("Registered successfully",{
            duration: 4000,
            position: "top-center",
          });
        });
      })
      .catch(() => {
        toast.error("You are already registered with this email");
        navigate("/login");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success("Registered successfully with Google");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("An error occurred while signing in with Google ");
    }
  };
  return (
    <>
      <Helmet>
        <title>Register - Visa Navigator</title>
        <meta name="description" content="Register for Visa Navigator" />
        <meta name="og:title" content="Register - Visa Navigator" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center  sm:bg-gray-50 py-12  sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          <div className="card border px-0 sm:p-6 bg-base-100 shadow-xl mx-auto">
            <h2 className="mt-6 text-center text-3xl font-extrabold ">
              Register
            </h2>
            <div className=" card-body">
              <form onSubmit={handleRegister} className=" space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    name="photo"
                    type="text"
                    placeholder="photo URL"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type={!showPassword ? "password" : "text"}
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <div className="relative w-full px-3 py-2 text-gray-400">
                    {error && <p className="text-red-600">{error}</p>}
                  </div>
                  {showPassword ? (
                    <FaEye
                      size={20}
                      className=" cursor-pointer absolute right-5 translate-y-12 top-1 "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      size={20}
                      className=" cursor-pointer absolute right-5 translate-y-12 top-1 "
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <div className="form-control my-3">
                  <button type="submit" className="btn btn-neutral">
                    Register
                  </button>
                </div>
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold underline">
                    Login here
                  </Link>
                </p>
              </form>
              <div className="divider">OR</div>
              <div className="">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn shadow w-full"
                >
                  <FcGoogle className="text-xl" />
                  <span className="">Register in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register