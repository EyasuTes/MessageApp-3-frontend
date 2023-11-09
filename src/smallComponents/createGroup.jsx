import React, { useEffect, useState } from "react";
import axios from "axios";
import { UsersThree } from "phosphor-react";
import { useChatCart } from "../context/context";
export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");

  const [addedMembers, setAddedMembers] = useState([]);
  const [error, setError] = useState("");
  const {
    api,
    user,
    setContactCreator,
    setChats,

    contacts,
  } = useChatCart();
  const makeGroup = async () => {
    const headers = {
      Authorization: `Bearer ${user.current.token}`,
      "content-type": "application/json",
    };
    await axios
      .post(
        api + "/api/chats/group",
        { members: addedMembers, name: groupName },
        { headers }
      )
      .then((responce) => {
        console.log(responce);
        setChats((prevArray) => [...prevArray, responce.data]);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
  };

  const handleCheckboxChange = (event, contact) => {
    console.log(event.target);
    console.log(contact);
    if (event.target.checked) {
      setAddedMembers((prev) => [...prev, contact]);
    } else {
      setAddedMembers((prev) => prev.filter((item) => item !== contact));
    }
  };

  return (
    <div
      className={` rounded-md shadow-xl fixed flex flex-col items-center top-1/2 left-1/2 bg-gray-700 w-72  transform -translate-x-1/2 -translate-y-1/2
       `}
    >
      <div className=" mt-4 bg-white rounded-full p-2">
        <UsersThree size={32} />
      </div>
      {error ? (
        <div className="text-center text-red-500 w-56">{error}</div>
      ) : (
        ""
      )}
      <div className="flex flex-col justify-center mt-2 gap-2">
        <input
          className="rounded-md text-lg p-2"
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <div className="flex justify-center">
          <div className="mb-2 border-b-2 text-xl text-white ">Add Members</div>
        </div>
      </div>
      <div className={` top-36 w-48 text-lg text-white `}>
        {contacts &&
          contacts.map((contact) => (
            <div
              className="border-b-2 gap-2 flex items-center"
              key={contact._id}
            >
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src={contact.pic}
                  alt=""
                />
              </div>

              <div className="flex-grow">{contact.name}</div>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, contact)}
              />
            </div>
          ))}
      </div>

      <div
        onClick={() => {
          makeGroup();
        }}
        className="text-xl bg-gradient-to-r from-primary  to-secondary mt-2 text-white bg-blue-500 text-center mb-4 rounded-md p-2 "
      >
        Create
      </div>
    </div>
  );
}
