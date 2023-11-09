import React, { useEffect, useState } from "react";
import SignUp from "../components/signUp";
import Login from "../components/login";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/chats");
    }
  }, []);
  return (
    <div>
      {isRegistered ? (
        <div>
          <SignUp setIsRegistered={setIsRegistered} />
        </div>
      ) : (
        <div>
          <Login setIsRegistered={setIsRegistered} />
        </div>
      )}
    </div>
  );
}
