import "./App.css";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { useRecoilState } from "recoil";
import { userIdState } from "./atoms/useIdState";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import Images from "./routes/Images";
import ImagesList from "./routes/ImagesList";
import MainContainer from "./routes/MainContainer";
import React from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [userId] = useRecoilState(userIdState);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Drawer
        userName={userName}
        setUserName={setUserName}
        toggleDrawer={toggleDrawer}
        open={open}
        setOpen={setOpen}
      />
      <Header toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/SignUp" element={<SignUp setUserName={setUserName} />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/music"
          element={
            userId ? <MainContainer /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/images"
          element={userId ? <Images /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/imagesList"
          element={userId ? <ImagesList /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
