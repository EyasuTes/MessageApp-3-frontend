import React, { useState, useEffect } from "react";
import ChatBox from "../components/chatBox";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChatCart } from "../context/context";

export default function ChatPage() {
  const { user, setChats, setContacts, pics } = useChatCart();

  const navigate = useNavigate();

  useEffect(() => {
    let user1 = localStorage.getItem("userInfo");

    if (user1) {
      user1 = JSON.parse(user1);
      user.current = user1;
    } else {
      navigate("/");
    }
  }, []);
  // useEffect(() => {
  //   console.log(pics);
  //   updatePic();
  // }, [pics]);
  // const updatePic = async () => {
  //   console.log(pics);
  //   const headers = {
  //     Authorization: `Bearer ${user.current.token}`,
  //     "content-type": "application/json",
  //   };
  //   await axios
  //     .put(api + "/api/user", { pics: pics }, { headers })
  //     .then((res) => {
  //       console.log(res);
  //       user.current.pic = res.data.pic;
  //       console.log(user.current.pic);
  //     });
  // };
  const fetchChats = async () => {
    const api = import.meta.env.VITE_API_KEY;

    if (user.current) {
      const token = user.current.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      };

      await axios
        .get(api + "/api/chats", { headers })
        .then((responce) => {
          setChats(responce.data);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("userInfo");
          navigate("/");
        });
      await axios
        .get(api + "/api/contact", { headers })
        .then((responce) => {
          setContacts(responce.data);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("userInfo");
          navigate("/");
        });
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div style={{ height: "100vh" }} className="flex  ">
      <Sidebar></Sidebar>
      <ChatBox></ChatBox>
    </div>
  );
}
