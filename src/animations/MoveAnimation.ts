import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

import AReactNativeAnimation from './AReactAnimation';

export default class MoveAnimation extends AReactNativeAnimation {
  public position: Animated.Value;
  private toValue: number;

  constructor(duration: number, toValue: number) {
    super(duration);

    this.toValue = toValue;

    this.position = useRef(this.animationValue).current;
  }

  public override start = (): void => {
    Animated.timing(this.animationValue, {
      toValue: this.toValue,
      duration: this.duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (this.callback) {
        this.callback();
      }
    });
  };

  public updatePosition = (toValue: number): void => {
    this.toValue = toValue;
  };
}
