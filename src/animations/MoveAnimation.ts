import { Animated } from "react-native";
import AReactNativeAnimation from "./AReactAnimation";

export default class MoveAnimation extends AReactNativeAnimation {
  public position: Animated.AnimatedInterpolation<string | number>;
  private startPos: number;
  private endPos: number;

  constructor(duration: number, startPos: number, endPos: number) {
    super(duration);

    this.startPos = startPos;
    this.endPos = endPos;

    this.position = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.startPos, this.endPos],
    });
  }

  updatePositions(startPos: number, endPos: number) {
    this.startPos = startPos;
    this.endPos = endPos;

    this.position = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.startPos, this.endPos],
    });
  }
}
