import React from 'react';
import style from "./NavBar.module.css";
import { CgProfile } from "react-icons/cg";
import { HiOutlinePencilAlt, HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../fbase';

function NavBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <div className={style.navbar}>
      <div className={style.logo}><Link to="/"><h1>My Library</h1></Link></div>
      <div className={style.admin}>
        {isLoggedIn ? (
          <Link to="/profile"><span><CgProfile size={24}/></span></Link>
        ) : (
          <Link to="/auth"><span><CgProfile size={24}/></span></Link>
        )}
        <Link to="/record"><span><HiOutlinePencilAlt size={24} /></span></Link>
        {isLoggedIn && <span><HiOutlineLogout size={24} onClick={onLogOutClick}/></span>}
      </div>
    </div>
  );
}

export default NavBar;