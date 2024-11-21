import { atom, selector } from "recoil";
import { RecoilImagesOrder, RecoilCutImages } from "../types/index";

export const imagesState = atom<RecoilCutImages[]>({
  key: "imagesState",
  default: []
});

export const imagesOrderState = atom<RecoilImagesOrder[]>({
  key: "imagesOrderState",
  default: []
});

export const imagesOrderLengthSelector = selector({
  key: "imagesOrderLengthSelector",
  get: ({ get }) => {
    const recoilOrderImagesLength = get(imagesOrderState);
    return recoilOrderImagesLength.length;
  }
});

export const imagesLengthSelector = selector({
  key: "imagesLengthSelector",
  get: ({ get }) => {
    const recoilImagesLength = get(imagesState);
    return recoilImagesLength.length;
  }
});
