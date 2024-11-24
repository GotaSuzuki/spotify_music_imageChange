import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { Button, Input, InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms/useIdState";

const Login = ({ setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const setUserId = useSetRecoilState(userIdState);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user.id);

      const displayName =
        data.user.user_metadata.display_name ||
        `${data.user.user_metadata.last_name} ${data.user.user_metadata.first_name}`.trim();
      setUserName(displayName);

      alert("ログインしました");
      navigate("/");
    } catch {
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <main>
        <div>
          <form onSubmit={onLogin}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
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
            </div>
            <div style={{ padding: "20px" }}>
              <Button type="submit" variant="contained">
                ログイン
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
