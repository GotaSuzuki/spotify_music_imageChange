import { describe, expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import MainContainer from "../components/MainContainer"
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

describe(MainContainer, () => {
    test("音楽再生画面のレンダリングが正しく行われる", async () => {
        render(
            <BrowserRouter>
                <RecoilRoot>
                    <MainContainer/>
                </RecoilRoot>
            </BrowserRouter>
        )
        expect(screen.getByText("Loading...")).toBeInTheDocument();

    })
})