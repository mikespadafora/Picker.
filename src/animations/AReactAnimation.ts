import { Animated, Easing } from "react-native";
import { useRef } from 'react';
import IReactNativeAnimation from "./IReactNativeAnimation";

export default abstract class AReactNativeAnimation implements IReactNativeAnimation {
  protected duration: number;
  protected animationValue: Animated.Value;
  protected callback: (() => void) | null;

  constructor(duration: number) {
    this.duration = duration;
    this.animationValue = useRef(new Animated.Value(0)).current;
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
    }).start(() => {
      if (this.callback) {
        this.callback();
      }
    });
  };

  public resetAnimation = (value: number) => {
    this.animationValue.setValue(value);
  };

  public registerAnimationComplete = (callback: () => void): void => {
    if (callback !== null) {
      this.callback = callback;
    }
  };
}
