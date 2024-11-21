import { useRecoilValue, useSetRecoilState } from "recoil";
import { imagesOrderState, imagesState } from "../atoms/imagesState";
import supabase from "../lib/supabase";
import { userIdState } from "../atoms/useIdState";
import {
  handleItemClickParams,
  handlePlayClickParams,
  RecoilImagesOrder
} from "../types/index";
import { RecoilCutImages } from "../types/index";

const useCommon = () => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30
  ];

  const setRecoilImagesOrder = useSetRecoilState(imagesOrderState);
  const setRecoilImages = useSetRecoilState(imagesState);
  const userId = useRecoilValue(userIdState);

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("images").list("", {
      // ルートフォルダを指定する場合は空文字列を使用
      limit: 17,
      offset: 0,
      sortBy: { column: "last_accessed_at", order: "desc" }
    });

    if (error) {
      console.error("Error fetching media:", error);
      return;
    }

    // 各ファイルのpublicUrlを生成
    const imagesWithUrls: RecoilImagesOrder[] = data
      .filter((image) => image.name.startsWith(userId))
      .map((image, index) => {
        const start = originalTimes[index];
        const end = originalTimes[index + 1];
        const {
          data: { publicUrl }
        } = supabase.storage.from("images").getPublicUrl(image.name);
        return { ...image, publicUrl, start, end };
      });

    setRecoilImagesOrder(imagesWithUrls);
  };

  const getAllImages = async () => {
    const { data, error } = await supabase.storage.from("images").list("", {
      offset: 0,
      sortBy: { column: "last_accessed_at", order: "desc" }
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
          data: { publicUrl }
        } = supabase.storage.from("images").getPublicUrl(image.name);
        return { ...image, publicUrl, start, end };
      });

    // 画像名からuserIdを消去
    // 画像名が重複していたら画像のアップロードが出来ないため
    // また、UserIdを表示させないため
    const cutImagesName: RecoilCutImages[] = imagesWithUrls.map((image) => {
      const newImageName = {
        ...image,
        name: image.name.replace(userId, "")
      };
      return newImageName;
    });

    setRecoilImages(cutImagesName);
  };

  const handleItemClick = async ({
    text,
    navigate,
    setOpen,
    toggleDrawer,
    setUserId,
    setUserName,
    setRecoilImages,
    setRecoilImagesOrder,
    logout
  }: handleItemClickParams) => {
    switch (text) {
      case "登録":
        navigate("/SignUp");
        break;
      case "ログイン":
        navigate("/login");
        break;
      case "ログアウト":
        await logout({
          setUserName,
          setUserId,
          setRecoilImages,
          setRecoilImagesOrder,
          setOpen,
          navigate
        });
        break;
      default:
        toggleDrawer(false)();
    }
    setOpen(false);
  };

  //再生と停止の制御
  const handlePlayClick = ({
    track,
    audioRef,
    isPlaying,
    setIsPlaying,
    setIsFullScreen
  }: handlePlayClickParams) => {
    if (track && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play();
        setIsFullScreen(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return { getImages, getAllImages, handleItemClick, handlePlayClick };
};

export default useCommon;
