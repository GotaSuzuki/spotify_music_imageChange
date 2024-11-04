import { describe, expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Login from "../components/Login"
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe(Login, () => {
    test("ログイン画面のレンダリングが正しく行われる", () => {
        render(
            <BrowserRouter>
                <RecoilRoot>
                    <Login/>
                </RecoilRoot>
            </BrowserRouter>
        )
        expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
        expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
        expect(screen.getByLabelText("パスワード（確認）")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "ログイン"})).toBeInTheDocument();

    })
})