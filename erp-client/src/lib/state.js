import { atom, selector } from "recoil";

export const recommendState = atom({
  key: "recommendState", // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});
