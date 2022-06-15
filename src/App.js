import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./components/DetailPage/Detail";
import Main from "./components/MainPage/Main";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/book/:id" element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
