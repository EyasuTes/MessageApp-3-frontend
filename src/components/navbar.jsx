import React, { useEffect, useState } from "react";
import { User, MagnifyingGlass } from "phosphor-react";
import { useChatCart } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [optionList, setOptionList] = useState();
  const [searching, setSearching] = useState("");
  const [focus, setFocus] = useState(false);
  const { getUser, setChats } = useChatCart();
  const api = import.meta.env.VITE_API_KEY;
  // useEffect(() => {
  //   searchUsers(searching);
  // }, [searching]);
  // const searchUsers = async (e) => {
  //   let user = getUser();
  //   if (user) {
  //     const headers = {
  //       Authorization: `Bearer ${user.token}`,
  //       "content-type": "application/json",
  //     };
  //     await axios
  //       .get(api + `/api/user?search=${e}`, { headers })
  //       .then((responce) => {
  //         setOptionList(responce.data);
  //       });
  //   }
  // };
  const addChat = async (id) => {
    let user = getUser();
    const body = {
      userID: id,
    };
    if (user) {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      };
      await axios
        .post(api + `/api/chats`, body, { headers })
        .then((responce) => {
          setChats((prevArray) => [...prevArray, responce.data]);
        });
    }
  };
  function logout() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  return (
    <div className="relative flex justify-between p-2 border-4 border-blue-100 bg-white">
      <div className="text-xl flex items-center">
        <MagnifyingGlass size={32} />
        {/* <input
          value={searching}
          className="bg-gray-200"
          onChange={(e) => {
            setSearching(e.target.value);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          type="text"
        /> */}
      </div>
      {/* <div
        className={`absolute top-14 left-10 bg-white w-24 ${
          searching === "" ? "hidden" : ""
        }`}
      >
        {optionList &&
          optionList.map((option) => (
            <div
              onClick={() => {
                console.log("Clicked on the div");
                addChat(option._id);
              }}
              key={option._id}
              className="hover:bg-blue-100 flex items-center gap-2 "
            >
              <User size={12} />
              <div>{option.name}</div>
            </div>
          ))}
      </div> */}
      <div className="text-xl">Eyasu chat_app</div>
      <div
        onClick={() => {
          logout();
        }}
        className=""
      >
        <User size={32} />
      </div>
    </div>
  );
}
