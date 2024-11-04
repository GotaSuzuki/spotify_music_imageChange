import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe(Home, () => {
    test("初期レンダリングが正しく行われる", () => {
        render(
            <BrowserRouter>
                <RecoilRoot>
                    <Home/>
                </RecoilRoot>
            </BrowserRouter>
        )
        expect(screen.getByText("ようこそ")).toBeInTheDocument();

        expect(screen.getByRole("link", {name: "Music slide show"})).toBeInTheDocument();
    })
})