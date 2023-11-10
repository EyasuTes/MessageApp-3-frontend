import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatCart } from "../context/context";
export default function SignUp({ setIsRegistered }) {
  const { api } = useChatCart();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async () => {
    if (!phone || !password) {
      console.log("fill all value");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        api + "/api/user/login",
        {
          phone,
          password,
        },
        config
      );
      console.log(data);

      await localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chats");
      setError("");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="bg-dark p-4 gap-4 flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-dark-alt p-2 text-white font-bold rounded-md">
        <h1 className="text-center ">Chat App</h1>
      </div>
      <div className="bg-dark-alt p-8 flex flex-col gap-8 rounded-md">
        <div className="flex justify-around text-white cursor-pointer">
          <div
            onClick={() => {
              setIsRegistered(false);
            }}
            className={
              "rounded-xl bg-gradient-to-r  from-secondary to-primary w-32 text-center"
            }
          >
            Login
          </div>
          <div
            onClick={() => {
              setIsRegistered(true);
            }}
          >
            Sign Up
          </div>
        </div>
        {error ? (
          <div className="text-red-500 font-bold flex justify-center">
            {error}
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2 text-xl">
          <input
            className="rounded-sm p-2 "
            type="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            className="rounded-sm p-2 "
            type="text"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className=" bg-gradient-to-r from-secondary to-primary rounded-sm  py-1"
        >
          LogIn
        </button>
      </div>
    </div>
  );
}
