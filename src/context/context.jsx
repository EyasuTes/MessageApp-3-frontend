import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import io from "socket.io-client";

const ChatContext = createContext({});

export function useChatCart() {
  return useContext(ChatContext);
}

export function ChatContextProvider({ children }) {
  const api = import.meta.env.VITE_API_KEY;
  const socket = io.connect(api);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groupCreator, setGroupCreator] = useState(false);
  const [contactCreator, setContactCreator] = useState(false);

  const user = useRef(null);

  useEffect(() => {
    if (selected) {
      const room = selected._id;
      socket.emit("join_Room", room);
    }
  }, [selected]);
  // const userImg = (chat) => {
  //   if (chat) {
  //     const friend = chat.users.find((u) => u._id !== user._id);

  //     return friend.pic;
  //   }
  //   return;
  // };
  return (
    <ChatContext.Provider
      value={{
        groupCreator,
        setGroupCreator,
        contactCreator,
        setContactCreator,

        contacts,
        setContacts,
        socket,
        setMessages,
        messages,
        selected,
        setSelected,
        chats,
        setChats,
        user,
        api,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
