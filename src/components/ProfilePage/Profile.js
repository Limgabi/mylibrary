import React from 'react';
import Library from './Library';
import style from "./Profile.module.css";
import { BsPersonCircle } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { authService } from '../../fbase';

function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.adminWrap}>
        <div className={style.adminInfo}>
          <div className={style.adminBtn}><BsPersonCircle size={60} /></div>
          <div>
            <div className={style.name}>{userObj.displayName}</div>
          </div>
        </div>
        <div className={style.btn}>
          <button onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>
      <Library userObj={userObj}/>
    </div>
  );
}

export default Profile;