import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms/useIdState";
import React from "react";
import useSupabase from "../hooks/useSupabase";

const Login = ({ setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdState);

  const { loginUser } = useSupabase();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({
      email,
      password,
      setUserId,
      setUserName,
      navigate
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 2,
        gap: 2
      }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ログイン
      </Typography>
      <Box
        component="form"
        onSubmit={onLogin}
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}>
        <TextField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          label="パスワード（確認）"
          type="password"
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large">
            ログイン
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
