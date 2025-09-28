import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post("/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          setCurrentState("Login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          "/api/user/login",
          {
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log(response.data);
          setAccessToken(response.data.accessToken);
          toast.success("Login Successful");
          // Navigate after login
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
