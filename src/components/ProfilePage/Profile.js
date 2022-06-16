import React, { useRef, useState } from 'react';
import { authService, storageService } from '../../fbase';
import { updateProfile } from 'firebase/auth';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import Library from './Library';
import Records from './Records';
import style from "./Profile.module.css";
import { HiPencil } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md"

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [profileImg, setProfileImg] = useState(userObj.photoURL);
  const fileInput = useRef(null);
  const basedURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

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

  const toggleUpdate = () => {
    setClickUpdate((prev) => !prev);
  }

  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  }

  const deleteProfile = async () => {
    const fileRef = ref(storageService, `profileImg/${userObj.uid}`);
    const ok = window.confirm("프로필 사진을 삭제하시겠습니까?");
    if (ok) {
      await deleteObject(fileRef);
      setProfileImg(basedURL);
    }
    setClickUpdate(!clickUpdate)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName == newDisplayName) {
      let profileImgURL = "";

      if (profileImg !== "") {
        const fileRef = ref(storageService, `profileImg/${userObj.uid}`);
        const uploadFile = await uploadString(fileRef, profileImg, 'data_url');
        console.log(uploadFile)
        profileImgURL = await getDownloadURL(uploadFile.ref);
        setProfileImg(profileImgURL);
      }

      if (userObj.displayName !== newDisplayName && userObj.photoURL !== profileImg) {
        await updateProfile(authService.currentUser, { displayName: newDisplayName, photoURL: profileImgURL });
        refreshUser();
      } else if (userObj.photoURL !== profileImg) {
        await updateProfile(authService.currentUser, { photoURL: profileImgURL });
        refreshUser();
      }
    } else if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    } 
    setClickUpdate(!clickUpdate);
  }

  return (
    <div className={style.container}>
      <div className={style.adminWrap}>
        <div className={style.adminInfo}>
          <form onSubmit={onSubmit}>
            <div className={style.profile}>
              {clickUpdate && <span onClick={deleteProfile} className={style.deleteImg}><MdOutlineClose /></span>}
              <img src={profileImg} />
              {clickUpdate && <span onClick={() => { fileInput.current.click() }}><HiPencil /></span>}
            </div>
            {<input
              type='file'
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg'
              name='profile_img'
              onChange={onFileChange}
              ref={fileInput} />}
            <div>
              {clickUpdate
                ? (<input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={newDisplayName}
                  onChange={onChange}
                  className={style.editInput}
                />
                ) : (<div className={style.name}>{userObj.displayName}</div>)
              }
            </div>
            <div className={style.btn}>
              {clickUpdate 
                ? (
                <div className={style.btnContainer}>
                  <button onClick={toggleUpdate}>취소</button>
                  <button onClick={onSubmit}>완료</button> 
                </div>
                ) : <button onClick={toggleUpdate}>프로필 편집</button>}
            </div>
          </form>
        </div>
      </div>
      <Library userObj={userObj} />
      <Records userObj={userObj} />
    </div>
  );
}

export default Profile;