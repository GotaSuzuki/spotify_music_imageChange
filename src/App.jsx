import "./App.css";
import { useState } from "react";
import MainContainer from "./components/MainContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import Images from "./components/Images";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./components/Home";
import { useRecoilState } from "recoil";
import { userIdState } from "./atoms/useIdState";
import ImagesList from "./components/ImagesList";

function App() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState();

  const [userId, setUserId] = useRecoilState(userIdState);

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
