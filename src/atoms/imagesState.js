import { atom, selector } from "recoil";

export const imagesState = atom({
  key: "imagesState",
  default: [],
});

export const recoilImagesLengthSelector = selector({
  key: "recoilImagesLengthSelector",
  get: ({ get }) => {
    const recoilImagesLength = get(imagesState);
    return recoilImagesLength.length;
  },
});
