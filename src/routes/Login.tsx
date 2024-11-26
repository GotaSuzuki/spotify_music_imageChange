import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms/useIdState";
import React from "react";
import useSupabase from "../hooks/useSupabase";
import { loginInputs, LoginProps } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../utils/validationSchema";

const Login = ({ setUserName }: LoginProps) => {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdState);

  const { loginUser } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginInputs>({ resolver: zodResolver(loginValidationSchema) });

  const onLogin = async (data: loginInputs) => {
    await loginUser({
      email: data.email,
      password: data.password,
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
        onSubmit={handleSubmit(onLogin)}
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
          fullWidth
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="パスワード"
          type="password"
          fullWidth
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="パスワード（確認）"
          type="password"
          fullWidth
          variant="outlined"
          {...register("passwordConf")}
          error={!!errors.passwordConf}
          helperText={errors.passwordConf?.message}
        />
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
