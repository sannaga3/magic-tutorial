import { Magic, RPCError, RPCErrorCode } from "magic-sdk";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [magic, setMagic] = useState();

  useEffect(() => {
    setMagic(new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("aaaa", magic, email);

    try {
      await magic.auth.loginWithMagicLink({
        email: email,
      });
      navigate("/about");
    } catch (err) {
      if (err instanceof RPCError) {
        switch (err.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
            break;
          default:
        }
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 bg-white py-8 shadow rounded-lg px-10 my-20">
        <h2 className="mt-3 mb-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="text-left block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
