import { useEffect } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer as MuiDrawer,
  Typography
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms/useIdState";
import { imagesOrderState, imagesState } from "../atoms/imagesState";
import React from "react";

interface DrawerProps {
  userName: string;
  setUserName: (name: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleDrawer: (open: boolean) => () => void;
}

const CustomDrawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  userName,
  setUserName,
  toggleDrawer
}: DrawerProps) => {
  const navigate = useNavigate();

  const setUserId = useSetRecoilState(userIdState);
  const setRecoilImages = useSetRecoilState(imagesState);
  const setRecoilImagesOrder = useSetRecoilState(imagesOrderState);

  const updateUserName = async () => {
    const { data } = await supabase.auth.getUser();
    if (data && data.user && data.user.user_metadata) {
      const displayName =
        data.user.user_metadata.display_name ||
        `${data.user.user_metadata.last_name} ${data.user.user_metadata.first_name}`.trim();
      setUserName(displayName);
      setUserId(data.user.id);
    } else {
      setUserName("");
      setUserId("");
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
      setUserId("");
      setRecoilImages([]);
      setRecoilImagesOrder([]);
      if (error) throw error;
      alert("ログアウトしました");
      setOpen(false);
      navigate("/");
    } catch {
      alert("エラーが発生しました");
    }
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
              }>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <MuiDrawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h6">{userName || "ゲスト"}さん</Typography>
        </Box>
        {DrawerList}
      </MuiDrawer>
    </Box>
  );
};

export default CustomDrawer;
