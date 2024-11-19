import "./App.css";
import { useState } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userIdState } from "./atoms/useIdState";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Home from "./routes/Home";
import Images from "./routes/Images";
import ImagesList from "./routes/ImagesList";
import MainContainer from "./routes/MainContainer";
import React from "react";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [userId] = useRecoilState(userIdState);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              userName={userName}
              setUserName={setUserName}
              toggleDrawer={toggleDrawer}
              open={open}
              setOpen={setOpen}
            />
          }>
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route
            path="/SignUp"
            element={<SignUp setUserName={setUserName} />}
          />
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
