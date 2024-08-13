import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const Images = () => {
  const [userId, setUserId] = useState("1");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getMedia();
  }, []);

  const getMedia = async () => {
    const { data, error } = await supabase.storage.from("images").list("", {
      // ルートフォルダを指定する場合は空文字列を使用
      limit: 10,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
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

    setMedia(mediaWithUrls);
  };

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("images")
      .upload(userId + file.name, file);

    if (error) {
      console.error("Error uploading image:", error);
    } else {
      getMedia(); // アップロード後に画像リストを更新
    }
  };

  return (
    <div className="mt-5">
      <input type="file" onChange={(e) => uploadImage(e)} />
      <div className="mt-5">My Uploads</div>
      {media.map((item) => (
        <div key={item.id}>
          <img
            src={item.publicUrl}
            alt={item.name}
            style={{ maxWidth: "200px", margin: "10px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
