import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../provider/AuthContext";
import toast from "react-hot-toast";
const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        
        try {
          e.preventDefault();
          const form = e.target;
          const email = form.email.value;
          const password = form.password.value;
          setError("");
          await signIn(email, password);
          toast.success("Logged in successfully");
          navigate(state || "/");
          form.reset();
          setForgotEmail("");
        } catch {
          setError("Invalid email or password");
          toast.error("Please Try Again");
        }
      };
      const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
          navigate(state || "/");
          toast.success("Logged in successfully with Google", {
            duration: 4000,
            position: "top-center",
          });
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error("An error occurred while Logged in with Google ");
        }
      };
    
    return (
        <>
          <Helmet>
            <title> Login - Visa Navigator</title>
            <meta name="description" content="Login to your visa navigator account." />
          </Helmet>
          <div className="min-h-screen flex items-center justify-center dark:bg-neutral sm:bg-gray-50 py-12  sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div className="card border px-0 sm:p-6 bg-base-100 shadow-xl mx-auto">
                <h2 className="mt-6 text-center text-3xl font-extrabold ">
                  Login
                </h2>
                <div className="card-body">
                  <form onSubmit={handleLogin} className="">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className=" relative form-control">
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
                      {error && <p className="text-red-600 pt-3">{error}</p>}
    
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
                      <label className="label">
                        <Link
                          state={forgotEmail}
                          to="/forgotPassword"
                          className="label-text-alt link link-hover"
                        >
                          Forgot password?
                        </Link>
                      </label>
                    </div>
                    <div className="form-control my-3">
                      <button type="submit" className="btn btn-neutral">
                        Login
                      </button>
                    </div>
                  </form>
                  <p className="text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-bold underline">
                      Register here
                    </Link>
                  </p>
    
                  <div className="divider">OR</div>
                  <div className="">
                    <button
                      onClick={handleGoogleSignIn}
                      className="btn shadow w-full"
                    >
                      <FcGoogle className="text-xl" />
                      <span className="">Login in with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Login