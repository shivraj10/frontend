import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function Conversation({ conversation, anotherUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/users/` + anotherUser);
        console.log(res.data.username)
        await setUser(res.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [anotherUser, conversation]);

  console.log(anotherUser ,user)
  return (
    <div className="conversation">
      <span className="conversationName">{user}</span>
    </div>
  );
}
