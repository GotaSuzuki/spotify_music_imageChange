import { useRecoilValue, useSetRecoilState } from "recoil";
import { imagesState } from "../atoms/imagesState";
import supabase from "../lib/supabase";
import { userIdState } from "../atoms/useIdState";

const useCommon = () => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30,
  ];

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

    setRecoilImages(imagesWithUrls);
  };

  return { getImages };
};

export default useCommon;
