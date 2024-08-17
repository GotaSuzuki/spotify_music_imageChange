import React from "react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms/useIdState";
import { Link } from "react-router-dom";

const Home = () => {
  const userId = useRecoilValue(userIdState);

  return (
    <>
      {userId ? (
        <div>
          <h1>ようこそ</h1>
        </div>
      ) : (
        <div>
          <h1>ようこそ</h1>
          <h3>
            <Link to="/login">ログインしてね</Link>
          </h3>
        </div>
      )}
    </>
  );
};

export default Home;
