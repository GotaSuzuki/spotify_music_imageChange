import React from "react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms/useIdState";
import { Link as RouterLink } from "react-router-dom";
import { LinkProps, Link as MuiLink } from "@mui/material";

// MUIのLinkとReact RouterのLinkを組み合わせたカスタムコンポーネント
const Link = React.forwardRef<HTMLAnchorElement, LinkProps & { to: string }>(
  (props, ref) => <MuiLink component={RouterLink} ref={ref} {...props} />
);

const Home = () => {
  const userId = useRecoilValue(userIdState);

  return (
    <>
      {userId ? (
        <div>
          <h1>ようこそ</h1>
          <h2>
            <Link to="/music">Music slide show</Link>
          </h2>
        </div>
      ) : (
        <div>
          <h1>ようこそ</h1>
          <div>
            <Link to="/music" underline="hover" variant="h5">
              Music slide show
            </Link>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <Link to="/music" underline="always" variant="h6">
              ログインしてね
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
