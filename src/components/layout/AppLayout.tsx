import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  styled
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import CustomDrawer from "../CustomDrawer";

interface AppLayoutProps {
  userName: string;
  setUserName: (name: string) => void;
  toggleDrawer: (open: boolean) => () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// スタイル付きのLinkコンポーネント
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit"
});

const AppLayout = ({
  toggleDrawer,
  userName,
  setUserName,
  open,
  setOpen
}: AppLayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomDrawer
        userName={userName}
        setUserName={setUserName}
        open={open}
        setOpen={setOpen}
        toggleDrawer={toggleDrawer}
      />

      {/* AppBarでヘッダー部分を作成 */}
      <AppBar
        position="fixed"
        sx={{
          background: "transparent",
          boxShadow: "none"
        }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}>
            <SettingsIcon />
          </IconButton>

          {/* ボタン群をStackで配置 */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexGrow: 1,
              justifyContent: "center"
            }}>
            <StyledLink to="/">
              <Button variant="contained" color="primary">
                ホーム
              </Button>
            </StyledLink>

            <StyledLink to="/music">
              <Button variant="contained" color="success">
                音楽へ
              </Button>
            </StyledLink>

            <StyledLink to="/images">
              <Button variant="contained" color="warning">
                画像アップロード
              </Button>
            </StyledLink>

            <StyledLink to="/imagesList">
              <Button variant="contained" color="primary">
                画像一覧
              </Button>
            </StyledLink>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(to right, aquamarine, pink)",
          pt: "80px" // AppBarの高さ分のパディング
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;