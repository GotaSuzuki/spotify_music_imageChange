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
import { PATHS } from "./utils/constants";

function App() {
  const [userName, setUserName] = useState("");
  const [userId] = useRecoilState(userIdState);

  return (
    <>
      <Routes>
        <Route
          path={PATHS.HOME}
          element={<AppLayout userName={userName} setUserName={setUserName} />}>
          <Route
            path={PATHS.LOGIN}
            element={<Login setUserName={setUserName} />}
          />
          <Route
            path={PATHS.SIGNUP}
            element={<SignUp setUserName={setUserName} />}
          />
          <Route path={PATHS.HOME} element={<Home />} />
          <Route
            path={PATHS.MUSIC}
            element={
              userId ? <MainContainer /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path={PATHS.IMAGES}
            element={userId ? <Images /> : <Navigate replace to="/login" />}
          />
          <Route
            path={PATHS.IMAGESLIST}
            element={userId ? <ImagesList /> : <Navigate replace to="/login" />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
