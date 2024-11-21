import { useEffect } from "react";
import supabase from "../lib/supabase";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms/useIdState";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { imagesLengthSelector, imagesState } from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import React from "react";

const ImagesList = () => {
  const recoilImages = useRecoilValue(imagesState);
  const recoilImagesLength = useRecoilValue(imagesLengthSelector);
  const userId = useRecoilValue(userIdState);

  const { getImages, getAllImages } = useCommon();

  useEffect(() => {
    if (recoilImagesLength === 0) {
      getAllImages();
    }
  }, [recoilImagesLength, getAllImages]);

  const handleDelete = async (name) => {
    const { error } = await supabase.storage
      .from("images")
      .remove([userId + name]);

    if (error) {
      console.error("Error");
      enqueueSnackbar("削除に失敗しました", { variant: "error" });
      return;
    }

    // ImagesList.jsxのリストの更新のため
    await getAllImages();
    // Images.jsxのリストの更新のため
    await getImages();

    enqueueSnackbar("削除しました", {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      action
    });
  };

  // ポップアップ
  const action = (key) => (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => closeSnackbar(key)}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 2 // MUIのspacingを使う
      }}>
      <Box sx={{ mt: 2 }}>
        <SnackbarProvider />
      </Box>
      <Box>
        <Typography variant="h6">
          保存している画像数：{recoilImagesLength}枚
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          minHeight: 0
        }}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "100%",
            overflow: "auto"
          }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="images table">
            <TableHead>
              <TableRow>
                <TableCell>画像名</TableCell>
                <TableCell align="center">画像</TableCell>
                <TableCell align="right">削除ボタン</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recoilImages.map(
                (image: { name: string; publicUrl: string }) => (
                  <TableRow key={image.name}>
                    <TableCell component="th" scope="row">
                      {image.name}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={image.publicUrl}
                        alt={image.name}
                        style={{ height: 50, width: 50 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(image.name)}>
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ImagesList;
