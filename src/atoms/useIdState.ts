import { atom } from "recoil";
import persistAtom from "./recoilPersist";

export const userIdState = atom({
  key: "userIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
