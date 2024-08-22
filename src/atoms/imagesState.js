import { atom, selector } from "recoil";

export const imagesState = atom({
  key: "imagesState",
  default: [],
});

export const imagesOrderState = atom({
  key: "imagesOrderState",
  default: [],
});

export const imagesOrderLengthSelector = selector({
  key: "imagesOrderLengthSelector",
  get: ({ get }) => {
    const recoilOrderImagesLength = get(imagesOrderState);
    return recoilOrderImagesLength.length;
  },
});

export const imagesLengthSelector = selector({
  key: "imagesLengthSelector",
  get: ({ get }) => {
    const recoilImagesLength = get(imagesState);
    return recoilImagesLength.length;
  },
});
