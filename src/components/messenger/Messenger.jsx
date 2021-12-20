import "./messenger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);  
  const [sender, setSender] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      console.log("getC")
      try {
        let res = await axios.get(`${process.env.REACT_APP_URL}/chat/getConversation`);
        console.log(res)
        let mapped = await res.data.map(
          (object) => {
          let anotherUser

          object.members.forEach( member => { 
            if(member != object.user )
              anotherUser = member
            
          })
          console.log(anotherUser)
            return { _id :object._id, anotherUser:anotherUser }
        })
        setConversations(mapped);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      console.log("getM",currentChat?._id)
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/chat/message/` + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if(currentChat)
     {
      const getSender = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_URL}/users/${currentChat.anotherUser}` );
          setSender(res.data.username);
        } catch (err) {
          console.log(err);
        }
      };
      getSender()
     } 
    if(currentChat)
     {
      getMessages();
     } 
  }, [currentChat]);

let repeat =  setInterval(
    async function()
    {
      if(currentChat && messages.length>0)
      {        
        const res = await axios.get(`${process.env.REACT_APP_URL}/chat/message/` + currentChat._id);

        if(res.data.length>messages.length)
        {
          const last = messages[messages.length - 1].text
          let i=res.data.length -1
          for(; i>-1; i--)
          {
            if(res.data[i].text===last)
              break;
          }
          i+=1
          const arrivalMessage= res.data.slice(i)
          
        setMessages([...messages, ...arrivalMessage]);
        }          
      }
    }
    , 5000);
    useEffect(() => {
      return function cleanup() {
        clearInterval( repeat )
      };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/chat/addMessage`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(conversations)
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {
                conversations.map((c,i) => (
                <div key={i} onClick={() => setCurrentChat(c)}>
                  <Conversation  conversation={c} anotherUser={c.anotherUser} />
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? 
              (
              <>
                <h5>{sender}</h5>
                <div className="chatBoxTop">
                  {messages.map((m,i) => (
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m.sender !== currentChat.anotherUser} />

                      {console.log(m.sender,currentChat.anotherUser)}
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}