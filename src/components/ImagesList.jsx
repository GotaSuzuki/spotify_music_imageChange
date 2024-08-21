import React, { useEffect } from "react";
import supabase from "../lib/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "../atoms/useIdState";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { imagesState } from "../atoms/imagesState";

const ImagesList = () => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30,
  ];

  const [recoilImages, setRecoilImages] = useRecoilState(imagesState);
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    getAllImages();
  }, [recoilImages]);

  const getAllImages = async () => {
    const { data, error } = await supabase.storage.from("images").list("", {
      offset: 0,
      sortBy: { column: "last_accessed_at", order: "desc" },
    });

    if (error) {
      console.error("Error fetching media:", error);
      return;
    }

    // 各ファイルのpublicUrlを生成
    const imagesWithUrls = data
      .filter((image) => image.name.startsWith(userId))
      .map((image, index) => {
        const start = originalTimes[index];
        const end = originalTimes[index + 1];
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(image.name);
        return { ...image, publicUrl, start, end };
      });

    // 画像名からuserIdを消去
    // 画像名が重複していたら画像のアップロードが出来ないため
    // また、UserIdを表示させないため
    const cutImagesName = imagesWithUrls.map((image) => {
      const newImageName = {
        ...image,
        name: image.name.replace(userId, ""),
      };
      return newImageName;
    });

    setRecoilImages(cutImagesName);
  };

  const handleDelete = async (name) => {
    const { data, error } = await supabase.storage
      .from("images")
      .remove([userId + name]);

    if (error) {
      console.error("Error");
      enqueueSnackbar("削除に失敗しました", { variant: "error" });
      return;
    }

    enqueueSnackbar("削除しました", {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      action,
    });
  };

  const action = (key) => (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => closeSnackbar(key)}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <SnackbarProvider />
      </div>
      <div style={{ marginTop: "100px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="images table">
            <TableHead>
              <TableRow>
                <TableCell>画像名</TableCell>
                <TableCell align="center">画像</TableCell>
                <TableCell align="right">削除ボタン</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recoilImages.map((image) => (
                <TableRow
                  key={image.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {image.name}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={image.publicUrl}
                      alt={image.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(image.name)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ImagesList;
