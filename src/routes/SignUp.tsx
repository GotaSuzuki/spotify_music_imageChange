import { useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConf) {
      alert("パスワードが一致しません");
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            display_name: `${lastName} ${firstName}`.trim()
          }
        }
      });
      if (error) throw error;
      setUserName(`${lastName} ${firstName}`.trim());
      alert("登録しました");
      navigate("/");
    } catch (error) {
      alert("エラーが発生しました: " + error.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FormControl>
              <InputLabel htmlFor="mail">メールアドレス</InputLabel>
              <Input
                id="mail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">パスワード</InputLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="confirmPassword">
                パスワード（確認）
              </InputLabel>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lastName">姓</InputLabel>
              <Input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="firstName">名</InputLabel>
              <Input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </div>
          <div style={{ padding: "20px" }}>
            <Button type="submit" variant="contained">
              サインアップ
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
