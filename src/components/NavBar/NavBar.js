import React from 'react';
import style from "./NavBar.module.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn }) {
  return (
    <div className={style.navbar}>
      <div className={style.logo}><Link to="/"><h1>My Library</h1></Link></div>
      <div className={style.admin}>
        {isLoggedIn ? (
          <Link to="/profile"><span><CgProfile size={24} /></span></Link>
        ) : (
          <Link to="/auth"><span><CgProfile size={24} /></span></Link>
        )}
        <span><HiOutlinePencilAlt size={24} /></span>
      </div>
    </div>
  );
}

export default NavBar;