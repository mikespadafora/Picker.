import { Animated } from "react-native";

export default interface IReactNativeAnimation {
  start: () => void;
  registerAnimationComplete: (callback: () => void) => void;
}
