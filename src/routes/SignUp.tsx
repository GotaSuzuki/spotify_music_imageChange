import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import useSupabase from "../hooks/useSupabase";
import { PATHS } from "../utils/constants";

interface SignUpProps {
  setUserName: (name: string) => void;
}

const SignUp = ({ setUserName }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const { signUp } = useSupabase();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp({
      e,
      email,
      password,
      passwordConf,
      firstName,
      lastName,
      setUserName,
      navigate
    });
    navigate(PATHS.HOME);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography component="h1" variant="h5">
          サインアップ
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3, width: "100%" }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              id="email"
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />

            <TextField
              required
              fullWidth
              id="password"
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />

            <TextField
              required
              fullWidth
              id="confirmPassword"
              label="パスワード（確認）"
              type="password"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
              variant="outlined"
            />

            <TextField
              required
              fullWidth
              id="lastName"
              label="姓"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
            />

            <TextField
              required
              fullWidth
              id="firstName"
              label="名"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}>
              登録する
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
