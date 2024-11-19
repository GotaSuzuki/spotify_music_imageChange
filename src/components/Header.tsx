import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleDrawer: (open: boolean) => () => void;
}

const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "linear-gradient(to right, aquamarine, pink)"
      }}>
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            listStyleType: "none",
            height: "80px",
            alignItems: "center" // 水平中央揃え
          }}>
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
            <Link to="/images">
              <Button variant="contained" color="warning">
                画像アップロード
              </Button>
            </Link>
          </li>
          <li style={{ listStyle: "none", padding: "30px" }}>
            <Link to="/imagesList">
              <Button variant="contained" color="primary">
                画像一覧
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
