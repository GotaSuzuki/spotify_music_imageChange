import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import ImagesList from "../components/ImagesList";
import { imagesLengthSelector, imagesState } from "../atoms/imagesState";

const recoilImagesMock = [
    { name: 'image1', publicUrl: 'http://example.com/image1.jpg' },
    { name: 'image2', publicUrl: 'http://example.com/image2.jpg' },
];

// Recoilのモック設定
vi.mock('recoil', async () => {
    const recoil = await vi.importActual('recoil');
    return {
        ...recoil,
        useRecoilValue: (selector) => {
            switch (selector) {
                case imagesState:
                    return recoilImagesMock; // 画像データを返す
                case imagesLengthSelector:
                    return recoilImagesMock.length; // 画像の数を返す
                default:
                    return null; // デフォルトはnull
            }
        },
    };
});

describe(ImagesList, () => {
    test("画像一覧のレンダリングが正しく行われる", () => {
        render(
            <BrowserRouter>
                <RecoilRoot>
                    <ImagesList />
                </RecoilRoot>
            </BrowserRouter>
        );
         // 保存している画像数の表示があるか確認
         expect(screen.getByText("保存している画像数：2枚")).toBeInTheDocument();

         // 各画像名が表示されているか確認
        expect(screen.getByText("image1")).toBeInTheDocument();
        expect(screen.getByText("image2")).toBeInTheDocument();

        // 各画像が表示されているか確認
        const image1 = screen.getByAltText("image1");
        const image2 = screen.getByAltText("image2");
        expect(image1).toHaveAttribute('src', 'http://example.com/image1.jpg');
        expect(image2).toHaveAttribute('src', 'http://example.com/image2.jpg');
    })

})