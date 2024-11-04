import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

describe(Header, () => {
    test("ヘッダーの全てのボタンが正しくレンダリングされる", () => {
        // モックのtoggleDrawer関数を作成
        const mockToggleDrawer = (newOpen) => () => {};

        render(
            <BrowserRouter>
                <Header toggleDrawer={mockToggleDrawer} />
            </BrowserRouter>
        );

        // 全てのボタンの存在を確認
        expect(screen.getByRole("button", { name: "ホーム" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "音楽へ" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "画像アップロード" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "画像一覧" })).toBeInTheDocument();
        // Settings iconボタンの確認（アイコンのため、name属性ではなくaria-labelを使用する場合）
        expect(screen.getByTestId("SettingsIcon")).toBeInTheDocument();
    });

    test("全てのリンクが正しいパスを持っている", () => {
        const mockToggleDrawer = (newOpen) => () => {};

        render(
            <BrowserRouter>
                <Header toggleDrawer={mockToggleDrawer} />
            </BrowserRouter>
        );

        // 各リンクの href 属性を確認
        expect(screen.getByRole("link", { name: "ホーム" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "音楽へ" })).toHaveAttribute("href", "/music");
        expect(screen.getByRole("link", { name: "画像アップロード" })).toHaveAttribute("href", "/images");
        expect(screen.getByRole("link", { name: "画像一覧" })).toHaveAttribute("href", "/imagesList");
    });
})