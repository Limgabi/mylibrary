import React from 'react';
import Library from './Library';
import style from "./Profile.module.css";
import { BsPersonCircle } from "react-icons/bs"

function Profile({ userObj }) {
  return (
    <div className={style.container}>
      <div className={style.adminWrap}>
        <div className={style.adminInfo}>
          <div className={style.adminBtn}><BsPersonCircle size={60} /></div>
          <div>
            <div className={style.name}>{userObj.displayName}</div>
          </div>
        </div>
      </div>
      <Library userObj={userObj}/>
    </div>
  );
}

export default Profile;