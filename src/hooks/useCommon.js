import { useRecoilValue, useSetRecoilState } from "recoil";
import { imagesState } from "../atoms/imagesState";
import supabase from "../lib/supabase";
import { userIdState } from "../atoms/useIdState";

const useCommon = () => {
  const setRecoilImages = useSetRecoilState(imagesState);
  const userId = useRecoilValue(userIdState);

  const getImages = async () => {
    const { data, error } = await supabase.storage.from("images").list("", {
      // ルートフォルダを指定する場合は空文字列を使用
      limit: 16,
      offset: 0,
      sortBy: { column: "last_accessed_at", order: "desc" },
    });

    if (error) {
      console.error("Error fetching media:", error);
      return;
    }

    // 各ファイルのpublicUrlを生成
    const mediaWithUrls = data
      .filter((item) => item.name.startsWith(userId))
      .map((item) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(item.name);
        return { ...item, publicUrl };
      });

    setRecoilImages(mediaWithUrls);
  };

  return { getImages };
};

export default useCommon;
