import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import './Message.css';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Time unknown';
    // Check if the timestamp is a Firestore Timestamp object
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Handle server-provided timestamp
      return timestamp; // Assuming server sends timestamp in a displayable format
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        <span className="messageTime">{formatTimestamp(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;
