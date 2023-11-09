import React, { useEffect, useState, useRef } from "react";
import { DotsThreeVertical, UsersThree, User } from "phosphor-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useChatCart } from "../context/context";
import CreateContact from "../smallComponents/createContact";
import CreateGroup from "../smallComponents/createGroup";
export default function Sidebar() {
  const navigate = useNavigate();

  const [addOptions, setAddOptions] = useState(false);
  const [renameDrop, setRenameDrop] = useState(false);
  const optionsRef = useRef(null);
  const createContactRef = useRef(null);
  const createGroupRef = useRef(null);

  // const optionsRef = useRef(null);

  // const [searchContact, setSearchContact]= useState('')
  const {
    groupCreator,
    setGroupCreator,
    contactCreator,
    setContactCreator,
    api,
    user,
    chats,
    setSelected,
    selected,
    setMessages,

    contacts,
    userImg,
  } = useChatCart();

  function chatName(chat) {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    const friend = chat.users.find((u) => u._id !== user.current._id);
    console.log(contacts);
    if (contacts) {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].phone === friend.phone) {
          return contacts[i].name;
        }
      }
    }

    return friend.phone;
  }

  async function getMessages() {
    if (user.current) {
      const headers = {
        Authorization: `Bearer ${user.current.token}`,
        "content-type": "application/json",
      };

      await axios
        .get(api + `/api/message/${selected._id}`, { headers })
        .then((responce) => {
          setMessages(responce.data);
        });
    }
  }
  useEffect(() => {
    if (selected) {
      getMessages();
    }
  }, [selected]);

  function logout() {
    localStorage.removeItem("userInfo");
    navigate("/");
  }
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setAddOptions(false);
      }
      if (
        createContactRef.current &&
        !createContactRef.current.contains(event.target)
      ) {
        setContactCreator(false);
      }
      if (
        createGroupRef.current &&
        !createGroupRef.current.contains(event.target)
      ) {
        setGroupCreator(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{
        flex: 2,
      }}
      className="flex flex-col rounded-md m-2 bg-dark flex-1"
    >
      <div className="flex relative items-center justify-between p-2 ">
        <div className="p-2 rounded-md text-2xl font-bold text-white bg-gradient-to-r from-secondary to-primary">
          MernChatApp
        </div>
        <div
          className="hover:bg-blue-100 rounded-md text-white"
          onClick={() => setAddOptions(!addOptions)}
        >
          <DotsThreeVertical size={32} />
        </div>
        <div
          ref={optionsRef}
          className={`${
            addOptions ? " scale-100" : " scale-0"
          } rounded-md transition-all origin-top-right duration-200 absolute right-0 bg-blue-100 top-12 shadow-lg`}
        >
          <div
            onClick={() => {
              setContactCreator(!contactCreator);
              setGroupCreator(false);
            }}
            className="p-2  hover:bg-blue-200 "
          >
            Add Contact
          </div>
          <div
            onClick={() => {
              // setAddedMembers([]);
              setGroupCreator(!groupCreator);
              setContactCreator(false);
            }}
            className="p-2  hover:bg-blue-200 "
          >
            Add Group Chat
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 flex-grow">
        {chats &&
          chats.map((chat) => (
            <div
              onClick={() => {
                setSelected(chat);
              }}
              className={` text-white flex border-dark-alt p-2 ${
                selected._id === chat._id
                  ? " text-white bg-gradient-to-r from-primary to-secondary"
                  : " border-b-2 border-t-2 "
              }`}
              key={chat._id}
            >
              <div className="flex items-center gap-2 ">
                <div className="flex-grow flex items-center gap-2">
                  {chat.isGroupChat ? (
                    <div className="">
                      <UsersThree size={32} />
                    </div>
                  ) : (
                    // <img
                    //   style={{ objectFit: "cover" }}
                    //   className="h-12 w-12 rounded-full"
                    //   src={userImg(chat)}
                    //   alt=""
                    // />
                    <div className="">
                      <User size={32} />
                    </div>
                  )}

                  <div className="">{chatName(chat)}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center gap-4 items-center">
        <div className="flex  items-center">
          {/* <img
            style={{ objectFit: "cover" }}
            className="rounded-full w-12 h-12"
            src={user.current ? user.current.pic : ""}
            alt=""
          /> */}
          <div className="bg-white rounded-full p-2">
            <User size={32} />
          </div>

          <div
            style={{
              background: `linear-gradient(to left, rgb(var(--primary)), rgb(var(--secondary)))`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            className="font-bold text-2xl"
          >
            {user.current ? user.current.name : ""}
          </div>
        </div>

        <div
          style={{
            backgroundImage: `linear-gradient(to left, rgb(var(--primary)), rgb(var(--secondary)))`,
          }}
          onClick={logout}
          className="text-white p-2 rounded-md"
        >
          logout
        </div>
      </div>
      <div ref={createGroupRef}>
        {groupCreator ? <CreateGroup></CreateGroup> : ""}
      </div>

      <div ref={createContactRef}>
        {contactCreator ? <CreateContact></CreateContact> : ""}
      </div>
    </div>
  );
}
