import { Animated, Easing } from "react-native";
import IReactNativeAnimation from "./IReactNativeAnimation";

export default abstract class AReactNativeAnimation implements IReactNativeAnimation {
  private duration: number;
  protected animationValue: Animated.Value;
  private callback: (() => void) | null;

  constructor(duration: number) {
    this.duration = duration;
    this.animationValue = new Animated.Value(0);
    this.callback = null;
  }

  public setDuration = (duration: number) => {
    this.duration = duration;
  };

  public start = (): void => {
    Animated.timing(this.animationValue, {
      toValue: 1,
      duration: this.duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (this.callback) {
        this.animationValue = new Animated.Value(0);
        this.callback();
      }
    }, this.duration + 10);
  };

  public resetAnimation = () => {
    this.animationValue.setValue(0);
  };

  public registerAnimationComplete = (callback: () => void): void => {
    if (callback !== null) {
      this.callback = callback;
    }
  };
}
