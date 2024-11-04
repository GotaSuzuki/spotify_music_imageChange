import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import Images from "../components/Images";
import { useRecoilValue } from 'recoil';
import { imagesOrderLengthSelector } from '../atoms/imagesState.js';

vi.mock('recoil', async () => {
    const recoil = await vi.importActual('recoil');
    return {
        ...recoil,
        useRecoilValue: vi.fn(),
    };
});

describe(Images, () => {
    test("画像アップロードのレンダリングが正しく行われる", async () => {
         // モックデータの設定
         const mockImagesLength = 5;
         useRecoilValue.mockImplementation((selector) => {
             if (selector === imagesOrderLengthSelector) {
                 return mockImagesLength;
             }
         });
        render(
            <BrowserRouter>
                <RecoilRoot>
                    <Images />
                </RecoilRoot>
            </BrowserRouter>
        )
        expect(screen.getByText("残りの画像保存枚数：")).toBeInTheDocument();

        expect(screen.getByText("11")).toBeInTheDocument();

        expect(screen.getByText("Upload file")).toBeInTheDocument();

        expect(screen.getByRole("button", {name: "保存"})).toBeInTheDocument();
    })
})