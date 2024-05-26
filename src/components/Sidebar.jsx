import React from "react";
import Search from "./Search";
import Chats from "./Chats";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
