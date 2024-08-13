import "./App.css";
import { useEffect, useState } from "react";
import MainContainer from "./components/MainContainer";
import { ImagesChange } from "./components/ImagesChange";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Images from "./components/Images";
import SignUp from "./components/SignUp";
import supabase from "./lib/supabase";
import Login from "./components/Login";
import SettingsIcon from "@mui/icons-material/Settings";

function App() {
  const [open, setOpen] = useState();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const updateUserName = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data && data.user && data.user.user_metadata) {
      const displayName =
        data.user.user_metadata.display_name ||
        `${data.user.user_metadata.last_name} ${data.user.user_metadata.first_name}`.trim();
      setUserName(displayName);
    } else {
      setUserName("");
    }
  };

  useEffect(() => {
    updateUserName();
  }, []);

  const handleItemClick = async (text) => {
    switch (text) {
      case "登録":
        navigate("/SignUp");
        break;
      case "ログイン":
        navigate("/login");
        break;
      case "ログアウト":
        await Logout();
        break;
      default:
        toggleDrawer(false)();
    }
    setOpen(false);
  };

  const Logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUserName("");
      if (error) throw error;
      alert("ログアウトしました");
      setOpen(false);
      navigate("/");
    } catch {
      alert("エラーが発生しました");
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["登録", "ログイン", "ログアウト"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(text)}
              disabled={
                (userName && (text === "登録" || text === "ログイン")) ||
                (!userName && text === "ログアウト")
              }
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const [images, setImages] = useState([
    { src: "/images/image01.jpg", start: 0, end: 2.5, id: 1 },
    { src: "/images/image02.jpg", start: 2.5, end: 4.4, id: 2 },
    { src: "/images/image03.jpg", start: 4.4, end: 6.2, id: 3 },
    { src: "/images/image04.jpg", start: 6.2, end: 8, id: 4 },
    { src: "/images/image05.jpg", start: 8, end: 9.8, id: 5 },
    { src: "/images/image06.jpg", start: 9.8, end: 11.7, id: 6 },
    { src: "/images/image07.jpg", start: 11.7, end: 13.6, id: 7 },
    { src: "/images/image08.jpg", start: 13.6, end: 15.5, id: 8 },
    { src: "/images/image09.jpg", start: 15.5, end: 17.3, id: 9 },
    { src: "/images/image10.jpg", start: 17.3, end: 19.1, id: 10 },
    { src: "/images/image01.jpg", start: 19.1, end: 21, id: 11 },
    { src: "/images/image02.jpg", start: 21, end: 22.8, id: 12 },
    { src: "/images/image03.jpg", start: 22.8, end: 24.6, id: 13 },
    { src: "/images/image04.jpg", start: 24.6, end: 26.4, id: 14 },
    { src: "/images/image05.jpg", start: 26.4, end: 28.2, id: 15 },
    { src: "/images/image06.jpg", start: 28.2, end: 30, id: 16 },
  ]);

  return (
    <>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <h2 style={{ paddingLeft: "20px" }}>{userName || "ゲスト"}さん</h2>
          {DrawerList}
        </Drawer>
      </div>
      <header
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          height: "80px",
          zIndex: 1000,
          backgroundColor: "pink",
        }}
      >
        <nav>
          <ul
            style={{
              display: "flex",
              margin: 0,
              padding: 0,
              listStyleType: "none",
              height: "80px",
              alignItems: "center", // 水平中央揃え
            }}
          >
            <li style={{ listStyle: "none", padding: "30px" }}>
              <Button onClick={toggleDrawer(true)}>
                <SettingsIcon></SettingsIcon>
              </Button>
            </li>
            <li style={{ listStyle: "none", padding: "30px" }}>
              <Link to="/">
                <Button variant="contained" color="primary">
                  ホーム
                </Button>
              </Link>
            </li>
            <li style={{ listStyle: "none", padding: "30px" }}>
              <Link to="/music">
                <Button variant="contained" color="success">
                  音楽へ
                </Button>
              </Link>
            </li>
            <li style={{ listStyle: "none", padding: "30px" }}>
              <Link to="/change">
                <Button variant="contained" color="warning">
                  画像順番変更
                </Button>
              </Link>
            </li>
            <li style={{ listStyle: "none", padding: "30px" }}>
              <Link to="/images">
                <Button variant="contained" color="info">
                  画像アップロード
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/SignUp" element={<SignUp setUserName={setUserName} />} />
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<MainContainer images={images} />} />
        <Route
          path="/change"
          element={<ImagesChange images={images} setImages={setImages} />}
        />
        <Route path="/images" element={<Images />} />
      </Routes>
    </>
  );
}

function Home() {
  return;
}

export default App;
