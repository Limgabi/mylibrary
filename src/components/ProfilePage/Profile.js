import React, { useRef, useState } from 'react';
import { authService } from '../../fbase';
import { updateProfile } from 'firebase/auth';
import Library from './Library';
import style from "./Profile.module.css";

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [profileImg, setProfileImg] = useState(userObj.photoURL);
  const fileInput = useRef(null);

  const onFileChange = (e) => {
    const {
      target: { files }
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setProfileImg(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClickUpdate = () => {
    setClickUpdate(!clickUpdate);
  }
  
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  }

  const updateName = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
    setClickUpdate(!clickUpdate);
  }

  return (
    <div className={style.container}>
      <div className={style.adminWrap}>
        <div className={style.adminInfo}>
          <form>
            <div className={style.profile}>
              <img
                src={profileImg}
                onClick={() => { fileInput.current.click() }}
              />
            </div>
            <input
              type='file'
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg'
              name='profile_img'
              onChange={onFileChange}
              ref={fileInput} />
            <div>
              {clickUpdate 
                ? (<input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={newDisplayName}
                  onChange={onChange}
                  required
                  className={style.editInput}
                />
                ) : (<div className={style.name}>{userObj.displayName}</div>)
              }
            </div>
            <div className={style.btn}>
              {
                clickUpdate ? <button onClick={updateName}>update profile</button>
                  : <button onClick={onClickUpdate}>edit profile</button>
              }
            </div>
          </form>
        </div>
      </div>
      <Library userObj={userObj} />
    </div>
  );
}

export default Profile;