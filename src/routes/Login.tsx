import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms/useIdState";
import React from "react";

const Login = ({ setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const setUserId = useSetRecoilState(userIdState);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
      navigate("/");
    } catch {
      alert("エラーが発生しました");
    }
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
      <form onSubmit={onLogin} style={{ width: "100%", maxWidth: "400px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <InputLabel htmlFor="email">メールアドレス</InputLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby="email-helper-text"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">パスワード</InputLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="passwordConf">パスワード（確認）</InputLabel>
            <Input
              id="passwordConf"
              type="password"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
              required
            />
          </FormControl>
        </Box>
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
      </form>
    </Box>
  );
};

export default Login;
