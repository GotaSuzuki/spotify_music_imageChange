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
import { signUpProps } from "../types";
import { useForm } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Inputs {
  email: string;
  password: string;
  passwordConf: string;
  firstName: string;
  lastName: string;
}

const SignUp = ({ setUserName }: signUpProps) => {
  const navigate = useNavigate();

  const { signUp } = useSupabase();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ resolver: zodResolver(validationSchema) });

  const onSubmit = async (data: Inputs) => {
    await signUp({
      email: data.email,
      password: data.password,
      passwordConf: data.passwordConf,
      firstName: data.firstName,
      lastName: data.lastName,
      setUserName,
      navigate
    });
    navigate(PATHS.HOME);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography component="h1" variant="h5">
          サインアップ
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            {...register("passwordConf")}
            error={!!errors.passwordConf}
            helperText={errors.passwordConf?.message}
          />

          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Register
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignUp;
