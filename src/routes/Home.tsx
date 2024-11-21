import React from "react";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms/useIdState";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Link as MuiLink, LinkProps } from "@mui/material";

// MUIのLinkとReact RouterのLinkを組み合わせたカスタムコンポーネント
const Link = React.forwardRef<HTMLAnchorElement, LinkProps & { to: string }>(
  (props, ref) => <MuiLink component={RouterLink} ref={ref} {...props} />
);

const Home = () => {
  const userId = useRecoilValue(userIdState);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        ようこそ
      </Typography>
      {userId ? (
        <Typography variant="h5">
          <Link to="/music" underline="hover">
            Music slide show
          </Link>
        </Typography>
      ) : (
        <Box>
          <Typography variant="h5">
            <Link to="/music" underline="hover">
              Music slide show
            </Link>
          </Typography>
          <Box mt={4}>
            <Typography variant="h6">
              <Link to="/music" underline="always">
                ログインしてね
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
