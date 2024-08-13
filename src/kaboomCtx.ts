import kaboom from "kaboom";
import { scale } from "./constants";

export const k = kaboom({
    width: 256,
    height: 144,
    scale,
    letterbox: true,
    global: false
});