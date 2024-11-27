// typescriptの導入
// 別のcomponentやroutesに書かれていたSupabaseに関する関数をこちらのファイルに移行

import supabase from "../lib/supabase";
import { PATHS } from "../utils/constants";
import {
  LoginParams,
  UploadImageParams,
  DeleteImageParams,
  SignUpParams,
  LogoutParams,
  UpdateUserProps
} from "../types/index";

const useSupabase = () => {
  const loginUser = async ({
    email,
    password,
    setUserId,
    setUserName,
    navigate
  }: LoginParams) => {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUserId(user?.id);

      const displayName =
        data.user?.user_metadata.display_name ||
        `${data.user?.user_metadata.last_name} ${data.user?.user_metadata.first_name}`.trim();
      setUserName(displayName);

      alert("ログインしました");
      navigate(PATHS.HOME);
    } catch {
      alert("エラーが発生しました");
    }
  };

  const uploadImage = async ({
    file,
    userId,
    getImages,
    getAllImages,
    enqueueSnackbar
  }: UploadImageParams) => {
    try {
      const fileName = userId + file.name;

      const { data: existingFile } = await supabase.storage
        .from("images")
        .list("", {
          limit: 1,
          offset: 0,
          search: fileName
        });

      if (existingFile && existingFile.length > 0) {
        enqueueSnackbar("同じファイル名で登録することは出来ません", {
          variant: "error"
        });
        return;
      }

      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      await getImages();
      await getAllImages();
      enqueueSnackbar("画像のアップロードに成功しました！", {
        variant: "success"
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      enqueueSnackbar("画像のアップロードに失敗しました。", {
        variant: "error"
      });
    }
  };

  const deleteImage = async ({
    image: { name },
    userId,
    getImages,
    getAllImages,
    enqueueSnackbar,
    action
  }: DeleteImageParams) => {
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

  const signUp = async ({
    email,
    password,
    passwordConf,
    firstName,
    lastName,
    setUserName,
    navigate
  }: SignUpParams) => {
    if (password !== passwordConf) {
      alert("パスワードが一致しません");
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            display_name: `${lastName} ${firstName}`.trim()
          }
        }
      });
      if (error) throw error;
      setUserName(`${lastName} ${firstName}`.trim());
      alert("登録しました");
      navigate(PATHS.HOME);
    } catch (error) {
      alert("エラーが発生しました: " + error.message);
    }
  };

  const logout = async ({
    setUserName,
    setUserId,
    setRecoilImages,
    setRecoilImagesOrder,
    setOpen,
    navigate
  }: LogoutParams) => {
    try {
      const { error } = await supabase.auth.signOut();
      setUserName("");
      setUserId("");
      setRecoilImages([]);
      setRecoilImagesOrder([]);
      if (error) throw error;
      alert("ログアウトしました");
      setOpen(false);
      navigate(PATHS.HOME);
    } catch {
      alert("エラーが発生しました");
    }
  };

  const updateUserName = async ({
    setUserName,
    setUserId
  }: UpdateUserProps) => {
    const { data } = await supabase.auth.getUser();
    // オプショナルチェインの導入
    if (data?.user?.user_metadata) {
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

  return {
    loginUser,
    uploadImage,
    deleteImage,
    signUp,
    logout,
    updateUserName
  };
};

export default useSupabase;
