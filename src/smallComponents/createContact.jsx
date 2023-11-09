import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChatCart } from "../context/context";
export default function CreateContact() {
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [error, setError] = useState();
  const {
    api,
    user,
    contacts,
    contactCreator,
    setContactCreator,
    setChats,
    chats,
    setContacts,
  } = useChatCart();

  const addChat = async () => {
    let val = contacts.find((u) => u.phone === phone);
    for (let i = 0; i < chats.length; i++) {
      let val1 = chats[i].users.find((v) => v.phone === phone);
      if (val1) {
        setError("contact already exists");
        return;
      }
    }
    if (val) {
      setError("Contact already exists");
      return;
    }

    const body = {
      phone: phone,
    };
    if (user.current) {
      const headers = {
        Authorization: `Bearer ${user.current.token}`,
        "content-type": "application/json",
      };
      await axios
        .post(api + `/api/chats`, body, { headers })
        .then((responce) => {
          console.log(responce);
          setChats((prevArray) => [...prevArray, responce.data]);
          createContact(headers);
          setContactCreator(!contactCreator);
        })

        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error);
        });
    }
  };
  const createContact = async (headers) => {
    console.log("creating");
    await axios
      .post(
        api + `/api/contact`,
        { phone: phone, contactName: contactName },
        { headers }
      )
      .then((responce) => {
        setContacts((prevArray) => [...prevArray, responce.data]);
      });
  };
  return (
    <div>
      <div
        className={`fixed shadow-xl   flex rounded-md flex-col gap-4 p-2 top-1/2 left-1/2 bg-gray-700 transform -translate-x-1/2 -translate-y-1/2 
          
        `}
      >
        <div className="flex justify-between ">
          <div className="text-right w-2 h-2"></div>
        </div>
        {error ? <div className="text-red-500">{error}</div> : ""}
        <div className="flex flex-col justify-center  gap-4">
          <input
            placeholder="Phone Number"
            className="rounded-md text-2xl p-2"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            placeholder="Contact Name"
            className="rounded-md text-2xl p-2"
            type="text"
            value={contactName}
            onChange={(e) => {
              setContactName(e.target.value);
            }}
          />
        </div>
        <div className="flex-grow"></div>
        <div
          onClick={() => {
            addChat();
          }}
          className="bg-gradient-to-r from-primary to-secondary text-white text-xl bg-blue-500 text-center mb-4 rounded-md p-2 "
        >
          Create
        </div>
      </div>
    </div>
  );
}
