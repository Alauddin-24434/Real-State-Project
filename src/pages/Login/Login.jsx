import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

import useAuth from '../../hooks/useAuth';
import { getToken, saveUser } from '../../api/auth';
import './Login.css';

const Login = () => {
  const { signIn, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);

      // Get token
      await getToken(result?.user?.email);

      navigate('/');
      toast.success('Login successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      // Save user data in the database
      const dbResponse = await saveUser(result?.user);
      console.log(dbResponse);

      // Get token
      await getToken(result?.user?.email);

      navigate('/');
      toast.success('Login successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              id="password"
              required
              placeholder="Enter your password"
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="flex items-center mt-4 space-x-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">Or log in with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div
          onClick={handleGoogleLogin}
          className="flex items-center mt-4 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
        >
          <FcGoogle size={24} className="text-red-500 mr-2" />
          <p>Continue with Google</p>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
