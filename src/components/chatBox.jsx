import React, { useEffect, useState, useRef } from "react";
import { User, PaperPlaneRight, DotsThree, UsersThree } from "phosphor-react";
import { useChatCart } from "../context/context";
import axios from "axios";
let selectedCompare;

export default function ChatBox() {
  const {
    selected,
    api,
    user,
    setMessages,
    messages,
    socket,
    contacts,
    setContacts,
  } = useChatCart();
  const [userName, setUserName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [renameDrop, setRenameDrop] = useState(false);
  const [rename, setRename] = useState();
  const optionsRef = useRef(null);

  const inputRef = useRef(null);

  // let userName;
  const [text, setText] = useState("");
  const sendMessage = async () => {
    if (user.current) {
      const headers = {
        Authorization: `Bearer ${user.current.token}`,
        "content-type": "application/json",
      };
      const body = {
        content: text,
        chatId: selected,
      };
      await axios
        .post(api + "/api/message", body, { headers })
        .then((responce) => {
          setMessages((preValue) => [...preValue, responce.data]);
          socket.emit("message", responce.data, selected);
        });
    }
  };
  useEffect(() => {
    selectedCompare = selected;
  }, [selected]);
  useEffect(() => {
    if (selected) {
      if (selected.isGroupChat) {
        setUserName(selected.chatName);
      } else {
        let user1 = selected.users.find((u) => u._id !== user.current._id);
        if (contacts) {
          for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].phone === user1.phone) {
              setUserName(contacts[i].name);
            }
          }
        }
      }
    }
  });
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (message) => {
        if (selectedCompare) {
          if (message.chat._id === selectedCompare._id) {
            setMessages([...messages, message]);
          }
        }
      });
    }
    return () => {
      socket.off("message"); // detach the event listener when the component unmounts
    };
  });
  useEffect(() => {
    setRename(userName);
    if (renameDrop && inputRef.current) {
      inputRef.current.focus();
    }
  }, [renameDrop]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setRenameDrop(false);
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  // const handleRename = async (e) => {
  //   if (e.key === "Enter") {
  //     const token = user.current.token;
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "content-type": "application/json",
  //     };

  //     const contact = contacts.find((c) => c.name === userName);
  //     const body = {
  //       phone: contact.phone,
  //       name: rename,
  //     };
  //     await axios.put(api + "/api/contact", body, { headers }).then((res) => {
  //       setContacts((preVal) => {
  //         preVal.map((con) => {
  //           if (con.phone === contact.phone) {
  //             return { ...con, name: res.data.name };
  //           }
  //           return con;
  //         });
  //       });
  //     });
  //   }
  // };
  return (
    <div
      style={{ flex: 3 }}
      className=" bg-dark p-4 rounded-md flex flex-col m-2"
    >
      <div className="flex gap-2 items-center p-2 text-white ">
        {selected && selected.isGroupChat ? (
          <UsersThree size={32} />
        ) : (
          // <img
          //   style={{ objectFit: "cover" }}
          //   className="h-12 w-12 rounded-full"
          //   src={userImg(selected)}
          //   alt=""
          // />
          <User size={32} />
        )}

        <span className="flex-grow text-white">{userName}</span>
        {/* )} */}

        <div
          ref={optionsRef}
          className={`${
            showOptions ? "h-12" : "opacity-0 h-0"
          } absolute right-6 top-20 bg-white transition-all duration-500 rounded-md `}
        >
          <div className="hover:bg-blue-100">Remove User</div>
          <div
            onClick={() => setRenameDrop(!renameDrop)}
            className="hover:bg-blue-100"
          >
            Rename User
          </div>
        </div>
      </div>

      <div className="flex-grow flex   flex-col bg-dark-alt rounded-md">
        <div className="flex-grow rounded-md"></div>
        <div className="flex flex-col gap-2">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`px-2 ${
                  user.current._id === message.sender._id
                    ? "text-right  "
                    : "text-left"
                }`}
              >
                <div
                  style={{}}
                  className={`inline-block ${
                    user.current._id === message.sender._id
                      ? "bg-secondary text-white p-2 rounded-md "
                      : "bg-primary p-2 rounded-md"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
        </div>

        <div className="flex gap-2 p-2">
          <input
            className="bg-gray-500 flex-grow pl-4 text-white rounded-md"
            placeholder="Enter text here..."
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div
            onClick={sendMessage}
            className="bg-gradient-to-r from-secondary to-primary text-white rounded-md p-2 "
          >
            <PaperPlaneRight size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
