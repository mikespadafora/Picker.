import { Animated } from 'react-native';

import AReactNativeAnimation from './AReactAnimation';

export default class RotateAnimation extends AReactNativeAnimation {
  public rotation: Animated.AnimatedInterpolation<string | number>;
  private startDeg: string;
  private stopDeg: string;

  constructor(duration: number, startDeg: string, stopDeg: string) {
    super(duration);

    this.startDeg = startDeg;
    this.stopDeg = stopDeg;

    this.rotation = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.startDeg, this.stopDeg],
    });
  }
}
