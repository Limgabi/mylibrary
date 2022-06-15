import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authService } from "./fbase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Auth from "./components/AuthPage/Auth";
import Detail from "./components/DetailPage/Detail";
import Main from "./components/MainPage/Main";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/ProfilePage/Profile";
import Record from "./components/RecordPage/Record";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        } 
        if (user.photoURL === null) {
          const basedURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          user.photoURL = basedURL;
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName, photoURL: user.photoURL }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName, photoURL: user.photoURL }),
    });
  }

  return (
    <>
      {init ? (
        <BrowserRouter>
          <NavBar isLoggedIn={Boolean(userObj)} userObj={userObj} />
          <Routes>
            <Route path="/" element={<Main isLoggedIn={Boolean(userObj)}
              userObj={userObj} />} />
            <Route path="/auth" element={<Auth isLoggedIn={Boolean(userObj)}
              userObj={userObj} />} />
            <Route path="/profile" element={<Profile isLoggedIn={Boolean(userObj)}
              userObj={userObj} refreshUser={refreshUser}/>} />
            <Route path="/book/:id" element={<Detail isLoggedIn={Boolean(userObj)}
              userObj={userObj} />} />
            <Route path="/record" element={<Record isLoggedIn={Boolean(userObj)}
              userObj={userObj} />} />
          </Routes>
        </BrowserRouter>
      ) : "Initializing..."}
    </>
  );
}

export default App;
