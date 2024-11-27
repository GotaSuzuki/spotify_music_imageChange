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
import useSupabase from "../hooks/useSupabase";
import { DrawerProps } from "../types";
import useCommon from "../hooks/useCommon";

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

  // 純粋関数にするために関数をApp.tsxに移動
  const { logout } = useSupabase();
  const { handleItemClick } = useCommon();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["登録", "ログイン", "ログアウト"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() =>
                handleItemClick({
                  text,
                  navigate,
                  setOpen,
                  toggleDrawer,
                  setUserId,
                  setUserName,
                  setRecoilImages,
                  setRecoilImagesOrder,
                  logout
                })
              }
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
