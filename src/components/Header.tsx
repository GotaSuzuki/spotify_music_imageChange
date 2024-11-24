import SettingsIcon from "@mui/icons-material/Settings";
import { Button, AppBar, Toolbar, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../utils/constants";

interface HeaderProps {
  toggleDrawer: (open: boolean) => () => void;
}

const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(to right, aquamarine, pink)",
        zIndex: 1000
      }}>
      <Toolbar>
        <Box
          component="nav"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}>
          <Box
            component="ul"
            sx={{
              display: "flex",
              margin: 0,
              padding: 0,
              listStyle: "none",
              height: "80px",
              alignItems: "center"
            }}>
            <Box component="li" sx={{ padding: "30px" }}>
              <Button onClick={toggleDrawer(true)}>
                <SettingsIcon />
              </Button>
            </Box>
            <Box component="li" sx={{ padding: "30px" }}>
              <Link to={PATHS.HOME}>
                <Button variant="contained" color="primary">
                  ホーム
                </Button>
              </Link>
            </Box>
            <Box component="li" sx={{ padding: "30px" }}>
              <Link to="/music">
                <Button variant="contained" color="success">
                  音楽へ
                </Button>
              </Link>
            </Box>
            <Box component="li" sx={{ padding: "30px" }}>
              <Link to="/images">
                <Button variant="contained" color="warning">
                  画像アップロード
                </Button>
              </Link>
            </Box>
            <Box component="li" sx={{ padding: "30px" }}>
              <Link to="/imagesList">
                <Button variant="contained" color="primary">
                  画像一覧
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
