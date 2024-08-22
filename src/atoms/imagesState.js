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
    const recoilImagesLength = get(imagesOrderState);
    return recoilImagesLength.length;
  },
});
