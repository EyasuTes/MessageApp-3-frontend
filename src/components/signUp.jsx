import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatCart } from "../context/context";
export default function SignUp({ setIsRegistered }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setPics, pics } = useChatCart();

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username || !phone || !password || !confirmPassword) {
      setError("fill all the requirements");
      return;
    }
    if (password !== confirmPassword) {
      setError("passwords do not match");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number format is incorrect");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/user",
        {
          name: username,
          phone,
          password,
          pic: pics,
        },
        config
      );

      console.log(response);

      // Introduce a 5-second delay before executing the next line

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/chats");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  // const postedImage = (pic) => {
  //   console.log(pic);
  //   if (pic === undefined) {
  //     console.log("pic is undefined");
  //     return;
  //   }
  //   if (pic.type === "image/jpeg" || pic.type === "image/png") {
  //     const data = new FormData();
  //     data.append("file", pic);
  //     data.append("upload_preset", "chat_app");
  //     data.append("cloud_name", "dugt5g4wp");
  //     fetch("https://api.cloudinary.com/v1_1/dugt5g4wp/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data.url.toString());
  //         setPics(data.url.toString());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  return (
    <div className="p-4 gap-4 bg-dark flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-dark-alt p-2 rounded-md">
        <h1 className="text-center text-white font-bold">Chat App</h1>
      </div>
      <div className="bg-dark-alt p-8 flex flex-col gap-8 rounded-md">
        <div className="flex justify-around text-white cursor-pointer">
          <div
            onClick={() => {
              setIsRegistered(false);
            }}
          >
            Login
          </div>
          <div
            onClick={() => {
              setIsRegistered(true);
            }}
            className={
              "rounded-xl bg-gradient-to-r from-secondary to-primary bg-blue-500 w-32 text-center"
            }
          >
            Sign Up
          </div>
        </div>
        {error ? (
          <div className="flex justify-center text-red-500 font-bold">
            {error}
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col  gap-2 text-xl">
          <input
            className="rounded-sm p-2 "
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="rounded-sm p-2 "
            type="text"
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
          <input
            className={`rounded-sm p-2 `}
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {/* <input
            className={`rounded-sm p-2 `}
            type="file"
            accept="image/*"
            onChange={(e) => {
              postedImage(e.target.files[0]);
            }}
          /> */}
        </div>
        <button
          onClick={handleSubmit}
          className=" bg-gradient-to-r from-secondary to-primary rounded-sm text-white py-1"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
