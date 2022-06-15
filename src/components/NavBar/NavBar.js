import React from 'react';
import style from "./NavBar.module.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlinePencilAlt } from "react-icons/hi";

function NavBar() {
  return (
    <div className={style.navbar}>
      <div className={style.logo}><h1>My Library</h1></div>
      <div className={style.admin}>
        <span><CgProfile size={24} /></span>
        <span><HiOutlinePencilAlt size={24} /></span>
      </div>
    </div>
  );
}

export default NavBar;